import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MessageInput = ({ input, isLoading, onInputChange, onSubmit }: MessageInputProps) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={onInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-950/90 to-green-950/90 hover:from-blue-950 hover:to-green-950"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;