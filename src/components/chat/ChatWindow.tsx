import React, { useRef, useEffect, useState } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import { useChatOperations } from './useChatOperations';
import { MealForm } from '@/components/MealForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMealLogs } from '@/hooks/useMealLogs';
import { supabase } from '@/lib/supabase';
import { Message } from './types';

const WELCOME_MESSAGE = {
  role: 'assistant' as const,
  content: "Welcome to Your Health Coach! 🌟\n\n" +
           "Hi there! I'm here to help you achieve your health and fitness goals, one step at a time. Whether you're looking to lose weight, gain muscle, eat healthier, or just feel your best, I've got your back. 💪\n\n" +
           "Ask me anything about nutrition, exercise, calorie counts, recipes, or strategies to stay on track. Let's create a plan that works for you and keeps you motivated along the way!\n\n" +
           "Remember, every small step counts—let's start this journey together! 🚀"
};

const ChatWindow = () => {
  const [input, setInput] = useState('');
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealToLog, setMealToLog] = useState<{ meal_name: string; calories: number } | null>(null);
  const [userId, setUserId] = useState<string | undefined>();
  const [localMessages, setLocalMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChatOperations();
  const { addMeal } = useMealLogs(userId);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
    };
    getSession();
  }, []);

  // Update local messages when the server messages change, but only for authenticated users
  useEffect(() => {
    if (userId && messages.length > 0) {
      setLocalMessages(messages);
    }
  }, [messages, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!userId) {
      // If user is not authenticated, show a message in the chat
      setLocalMessages(prev => [
        ...prev,
        { role: 'user', content: input.trim() },
        { 
          role: 'assistant', 
          content: "To continue our conversation and get personalized health advice, please sign in or create an account. This helps me provide you with tailored recommendations and track your progress! 🔐" 
        }
      ]);
      setInput('');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    
    // Immediately add the user message to local state
    setLocalMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Then send the message to get AI response
    await sendMessage(userMessage);
  };

  const handleMealLog = (mealName: string, calories: number) => {
    console.log('Opening meal form with:', { mealName, calories });
    setMealToLog({ meal_name: mealName, calories });
    setShowMealForm(true);
  };

  const handleSaveMeal = async (mealData: { meal_name: string; calories: number }) => {
    console.log('Saving meal:', mealData);
    if (addMeal) {
      await addMeal(mealData);
      setShowMealForm(false);
      setMealToLog(null);
    }
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <MessageDisplay 
        messages={localMessages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        onLogMeal={handleMealLog}
      />
      <MessageInput 
        input={input}
        isLoading={isLoading}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />

      <Dialog open={showMealForm} onOpenChange={setShowMealForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Meal to Log</DialogTitle>
          </DialogHeader>
          {mealToLog && (
            <MealForm
              initialMeal={{
                id: '',
                meal_name: mealToLog.meal_name,
                calories: mealToLog.calories,
                user_id: '',
                created_at: new Date().toISOString(),
              }}
              onSubmit={handleSaveMeal}
              onCancel={() => setShowMealForm(false)}
              submitButtonText="Log Meal"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatWindow;