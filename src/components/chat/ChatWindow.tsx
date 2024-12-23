import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI health coach. I can help you with your health goals, recipe modifications, and calorie estimates. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add connection check on component mount
  useEffect(() => {
    checkSupabaseConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      console.log('Checking Supabase connection...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        toast.error('Error connecting to Supabase');
        return;
      }

      if (!session) {
        console.log('No active session found');
        return;
      }

      console.log('Session found:', session);
      
      // Test database connection
      const { data, error } = await supabase
        .from('user_metrics')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Database connection error:', error);
        toast.error('Error connecting to database');
      } else {
        console.log('Successfully connected to Supabase database');
      }
    } catch (err) {
      console.error('Connection check error:', err);
      toast.error('Error checking connection');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      console.log('Fetching user metrics...');
      const { data: userMetrics, error: metricsError } = await supabase
        .from('user_metrics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (metricsError) {
        console.error('Metrics error:', metricsError);
        toast.error("Error fetching user metrics");
        return;
      }

      console.log('Calling chat function...');
      const { data: response, error } = await supabase.functions.invoke('chat-health-coach', {
        body: {
          message: userMessage,
          userMetrics,
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
              {message.content}
            </div>
          </div>
        ))}
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