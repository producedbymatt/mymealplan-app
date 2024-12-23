import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-[80px]">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
  </div>
);

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) return;

        console.log('Loading chat history...');
        const { data: chatHistory, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading chat history:', error);
          toast.error("Failed to load chat history");
          return;
        }

        if (chatHistory && chatHistory.length > 0) {
          console.log('Chat history loaded:', chatHistory.length, 'messages');
          setMessages(chatHistory.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          })));
        } else {
          console.log('No chat history found, setting welcome message');
          const welcomeMessage = {
            role: 'assistant' as const,
            content: "Welcome to Your Health Coach! 🌟\n\n" +
                     "Hi there! I'm here to help you achieve your health and fitness goals, one step at a time. Whether you're looking to lose weight, gain muscle, eat healthier, or just feel your best, I've got your back. 💪\n\n" +
                     "Ask me anything about nutrition, exercise, calorie counts, recipes, or strategies to stay on track. Let's create a plan that works for you and keeps you motivated along the way!\n\n" +
                     "Remember, every small step counts—let's start this journey together! 🚀"
          };
          setMessages([welcomeMessage]);
          // Save welcome message to database
          await supabase.from('chat_messages').insert({
            role: welcomeMessage.role,
            content: welcomeMessage.content
          });
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error in loadChatHistory:', error);
        toast.error("Failed to initialize chat");
      }
    };

    loadChatHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log('Checking user authentication...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Auth error:', userError);
        toast.error("Authentication error");
        return;
      }

      if (!user) {
        console.log('No authenticated user found');
        toast.error("Please log in to use the chat feature");
        return;
      }

      // Save user message to database
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          role: 'user',
          content: userMessage
        });

      if (insertError) {
        console.error('Error saving user message:', insertError);
        toast.error("Failed to save message");
        return;
      }

      console.log('Calling chat function...');
      const { data: response, error } = await supabase.functions.invoke('chat-health-coach', {
        body: {
          message: userMessage,
          messageHistory: messages
        }
      });

      if (error) {
        console.error('Chat function error:', error);
        throw error;
      }

      console.log('Received response:', response);
      
      // Save assistant response to database
      const { error: assistantInsertError } = await supabase
        .from('chat_messages')
        .insert({
          role: 'assistant',
          content: response.message
        });

      if (assistantInsertError) {
        console.error('Error saving assistant message:', assistantInsertError);
        toast.error("Failed to save response");
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response.message }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Failed to get response from health coach");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <ReactMarkdown 
                className="prose dark:prose-invert prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0"
                components={{
                  p: ({children}) => <p className="whitespace-pre-line">{children}</p>,
                  ul: ({children}) => <ul className="m-0 ml-4 space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="m-0 ml-4 space-y-1">{children}</ol>,
                  li: ({children}) => <li className="m-0">{children}</li>,
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  h1: ({children}) => <h1 className="mt-6 mb-4 text-xl font-bold">{children}</h1>,
                  h2: ({children}) => <h2 className="mt-6 mb-3 text-lg font-bold">{children}</h2>,
                  h3: ({children}) => <h3 className="mt-6 mb-2 text-md font-bold">{children}</h3>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;