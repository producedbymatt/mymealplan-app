import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from './ChatWindow';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out
            ${isMobile 
              ? 'fixed inset-2 h-[calc(100vh-16px)]' 
              : 'h-[600px] w-[400px]'}`}
        >
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
          <ChatWindow />
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