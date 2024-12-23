import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from './types';
import TypingIndicator from './TypingIndicator';

interface MessageDisplayProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageDisplay = ({ messages, isLoading, messagesEndRef }: MessageDisplayProps) => {
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
  );
};

export default MessageDisplay;