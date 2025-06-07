import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-end mb-4 justify-start">
      <div className="rounded-2xl px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-bl-none">
      <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
      </div>
      </div>
    </div>
  )
};