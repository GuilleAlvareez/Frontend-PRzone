import React from 'react';

export function ChatBubble ({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`flex items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-4 py-2 max-w-md md:max-w-lg transition-colors duration-300 ${
          isUser
            ? 'bg-purple-600 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};