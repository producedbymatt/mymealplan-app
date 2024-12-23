import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X, EllipsisVertical } from "lucide-react";
import ChatWindow from './ChatWindow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const clearChatHistory = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .neq('role', 'assistant') // Keep the initial welcome message
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Chat history cleared",
        description: "Your chat history has been cleared successfully.",
      });

      // Force reload the chat window
      window.location.reload();
    } catch (error) {
      console.error('Error clearing chat history:', error);
      toast({
        title: "Error",
        description: "Failed to clear chat history. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] w-[400px] transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="font-semibold text-lg">AI Health Coach ✨</h3>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-[#0EA5E9] hover:text-white"
                  >
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={clearChatHistory}
                    className="text-red-600 dark:text-red-400"
                  >
                    Clear chat history
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-[#0EA5E9] hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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