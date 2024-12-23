import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from './types';
import TypingIndicator from './TypingIndicator';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MealForm } from "@/components/MealForm";
import { extractMealInfo } from './utils/chatUtils';

interface MessageDisplayProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageDisplay = ({ messages, isLoading, messagesEndRef }: MessageDisplayProps) => {
  const [showMealForm, setShowMealForm] = useState(false);
  const [mealToLog, setMealToLog] = useState<{ meal_name: string; calories: number } | null>(null);

  const handleLogMeal = (message: string) => {
    const mealInfo = extractMealInfo(message);
    if (mealInfo) {
      setMealToLog(mealInfo);
      setShowMealForm(true);
    }
  };

  return (
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
            {message.role === 'assistant' && extractMealInfo(message.content) && (
              <div className="mt-4 flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleLogMeal(message.content)}
                  className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
                >
                  Log this meal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                  className="hover:bg-[#0EA5E9] hover:text-white"
                >
                  No, thanks
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}
      <div ref={messagesEndRef} />

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
              onSubmit={async (mealData) => {
                console.log('Adding meal to log:', mealData);
                setShowMealForm(false);
                setMealToLog(null);
              }}
              onCancel={() => {
                setShowMealForm(false);
                setMealToLog(null);
              }}
              submitButtonText="Log Meal"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageDisplay;