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
import { useIsMobile } from '@/hooks/use-mobile';

const ChatWindow = () => {
  const [input, setInput] = useState('');
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealToLog, setMealToLog] = useState<{ meal_name: string; calories: number } | null>(null);
  const [userId, setUserId] = useState<string | undefined>();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChatOperations();
  const { addMeal } = useMealLogs(userId);
  const isMobile = useIsMobile();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUserId(session?.user?.id);
    };
    getSession();
  }, []);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    setLocalMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
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
    <div className={`flex flex-col ${isMobile ? 'h-[calc(100%-64px)]' : 'h-[calc(600px-64px)]'}`}>
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