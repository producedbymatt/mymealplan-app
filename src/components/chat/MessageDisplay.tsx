import React from 'react';
import { Message } from './types';
import { Button } from "@/components/ui/button";
import { extractMealInfo } from './utils/chatUtils';
import TypingIndicator from './TypingIndicator';
import ReactMarkdown from 'react-markdown';

interface MessageDisplayProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onLogMeal: (mealName: string, calories: number) => void;
}

const MessageDisplay = ({ messages, isLoading, messagesEndRef, onLogMeal }: MessageDisplayProps) => {
  const renderMessage = (message: Message) => {
    const mealInfo = message.role === 'assistant' ? extractMealInfo(message.content) : null;

    return (
      <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
        <div
          className={`max-w-[80%] p-4 rounded-lg ${
            message.role === 'assistant'
              ? 'bg-gradient-to-r from-blue-950/90 to-green-950/90 text-white'
              : 'bg-gradient-to-r from-orange-600/90 via-yellow-500/90 to-orange-600/90 text-white'
          }`}
        >
          <ReactMarkdown className="prose prose-invert">
            {message.content}
          </ReactMarkdown>
          
          {mealInfo && (
            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => onLogMeal(mealInfo.meal_name, mealInfo.calories)}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Log this meal
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-blue-700/20"
              >
                No, thanks
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div key={index}>
          {renderMessage(message)}
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="max-w-[80%] p-4 rounded-lg bg-gradient-to-r from-blue-950/90 to-green-950/90 text-white">
            <TypingIndicator />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplay;