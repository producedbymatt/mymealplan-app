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
    const shouldShowLogButtons = message.role === 'assistant' && 
      (message.content.toLowerCase().includes('would you like to log this') || 
       message.content.toLowerCase().includes('calories'));

    console.log('Message content:', message.content);
    console.log('Should show log buttons:', shouldShowLogButtons);
    console.log('Meal info:', mealInfo);

    return (
      <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'} mb-4`}>
        <div
          className={`max-w-[80%] p-4 rounded-lg animate-hue-rotate ${
            message.role === 'assistant'
              ? 'bg-gradient-to-r from-blue-950/90 to-green-950/90 text-white'
              : 'bg-gradient-to-r from-orange-800/90 via-orange-700/90 to-orange-800/90 text-white'
          }`}
        >
          <ReactMarkdown className="prose prose-invert">
            {message.content}
          </ReactMarkdown>
          
          {shouldShowLogButtons && (
            <div className="mt-4 flex gap-2">
              <Button
                onClick={() => onLogMeal(
                  mealInfo?.meal_name || "Unknown Food Item",
                  mealInfo?.calories || 0
                )}
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