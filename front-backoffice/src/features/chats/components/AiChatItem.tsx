import { IconCheck } from '@tabler/icons-react';
import React from 'react';

interface AiChatItemProps {
  aiUser: {
    id: string;
    fullName: string;
    username: string;
    profile: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export default function AiChatItem({ aiUser, isSelected, onSelect }: AiChatItemProps) {
  // Make sure we have a clean click handler that doesn't interfere with the CommandItem
  const handleClick = (e: React.MouseEvent) => {
    // Don't use preventDefault or stopPropagation as it might interfere with CommandItem
    onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center justify-between gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 overflow-hidden group ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      
      {/* Subtle animated border */}
      <div className={`absolute inset-0 rounded-lg border ${
        isSelected 
          ? 'border-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]' 
          : 'border-blue-400/40 shadow-[0_0_5px_1px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]'
      } transition-all duration-300`}></div>
      
      <div className="flex items-center gap-2 relative z-10">
        {/* Avatar with glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
          <img
            src={aiUser.profile || '/placeholder.svg'}
            alt={aiUser.fullName}
            className="h-8 w-8 rounded-full relative z-10 border border-blue-300/50"
          />
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-colors duration-300">
            {aiUser.fullName}
          </span>
          <span className="text-xs text-zinc-400">{aiUser.username}</span>
        </div>
      </div>
      
      {/* Checkmark - only one will be rendered */}
      {isSelected && (
        <div className="relative z-10 bg-blue-500 rounded-full p-0.5 w-4 h-4 flex items-center justify-center">
          <IconCheck className="h-2.5 w-2.5 text-white" />
        </div>
      )}
    </div>
  );
}