import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Message } from './types';

export const useChatOperations = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

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

  const sendMessage = async (userMessage: string) => {
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

      setMessages(prev => [...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response.message }
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error("Failed to get response from health coach");
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  return {
    messages,
    isLoading,
    isInitialized,
    sendMessage,
  };
};