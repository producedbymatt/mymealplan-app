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
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI health coach. I can help you with:\n\n" +
               "* Recipe suggestions\n" +
               "* Nutritional information\n" +
               "* General health questions\n\n" +
               "How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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