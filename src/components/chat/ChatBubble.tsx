import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from './ChatWindow';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<string | undefined>();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      setIsOpen(true);
      if (detail?.prompt) setPrefill(detail.prompt);
    };
    window.addEventListener('open-coach-chat', handler);
    return () => window.removeEventListener('open-coach-chat', handler);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] w-[calc(100vw-2rem)] max-w-[400px] sm:w-[400px] transition-all duration-300 ease-in-out mx-4 sm:mx-0">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="font-semibold text-lg">AI Health Coach ✨</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-[#0EA5E9] hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChatWindow prefillInput={prefill} onPrefillConsumed={() => setPrefill(undefined)} />
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-orange-600/90 via-yellow-500/90 to-orange-600/90 hover:from-orange-600 hover:to-orange-600 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatBubble;
