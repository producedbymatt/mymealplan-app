import React, { useRef, useEffect, useState } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import { useChatOperations } from './useChatOperations';

const ChatWindow = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChatOperations();

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
    await sendMessage(userMessage);
  };

  return (
    <div className="flex flex-col h-[calc(600px-64px)]">
      <MessageDisplay 
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <MessageInput 
        input={input}
        isLoading={isLoading}
        onInputChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatWindow;