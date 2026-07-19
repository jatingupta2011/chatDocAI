import React from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser }) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[80%] px-3 py-2 rounded-lg shadow-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;