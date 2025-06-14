import React, { useEffect, useRef } from 'react';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator.jsx';

export function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Si no es null o undefined, ejecuta scrollIntoView
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  return (
    <div className="flex-1 overflow-y-auto p-4 message-list">
      {messages.map((msg, index) => (
        <ChatBubble key={index} role={msg.role} content={msg.content} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};
