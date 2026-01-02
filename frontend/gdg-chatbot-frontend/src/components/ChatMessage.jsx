import React from 'react'
import {UserIcon, ComputerDesktopIcon} from '@heroicons/react/24/outline'

const ChatMessage  = ({message , isAi}) => {
   return (
    <div className={`max-w-7xl mx-auto flex items-start space-x-4 p-6 rounded-2xl transition-colors duration-200 ${
      isAi ? 'bg-gray-100' : 'bg-green-50'
      }`}>
      <div className={`shrink-0 rounded-full p-2 ${
        isAi ? 'bg-gray-200' : 'bg-green-100'
         }`}>
        {isAi ? (
          <ComputerDesktopIcon className="h-6 w-6 text-black" />
        ) : (
          <UserIcon className="h-6 w-6 text-green-600" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <p className={`font-medium ${isAi ? 'text-black' : 'text-green-900'}`}>
            {isAi ? 'Ai' : 'You'}
          </p>
        </div>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage 
