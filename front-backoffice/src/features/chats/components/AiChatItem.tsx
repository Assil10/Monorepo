import React from 'react'
import { IconCheck } from '@tabler/icons-react'

interface AiChatItemProps {
  aiUser: {
    id: string
    fullName: string
    username: string
    profile: string
  }
  isSelected: boolean
  onSelect: () => void
}

export default function AiChatItem({
  aiUser,
  isSelected,
  onSelect,
}: AiChatItemProps) {
  // Make sure we have a clean click handler that doesn't interfere with the CommandItem
  const handleClick = (e: React.MouseEvent) => {
    // Don't use preventDefault or stopPropagation as it might interfere with CommandItem
    onSelect()
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-lg p-2 transition-all duration-300 hover:bg-gray-100 ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      {/* Neon glow effect */}
      <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>

      {/* Subtle animated border */}
      <div
        className={`absolute inset-0 rounded-lg border ${
          isSelected
            ? 'border-blue-400 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]'
            : 'border-blue-400/40 shadow-[0_0_5px_1px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]'
        } transition-all duration-300`}
      ></div>

      <div className='relative z-10 flex items-center gap-2'>
        {/* Avatar with glow */}
        <div className='relative'>
          <div className='absolute inset-0 rounded-full bg-blue-500/30 blur-sm transition-all duration-300 group-hover:blur-md'></div>
          <img
            src={aiUser.profile || '/placeholder.svg'}
            alt={aiUser.fullName}
            className='relative z-10 h-8 w-8 rounded-full border border-blue-300/50'
          />
        </div>

        <div className='flex flex-col'>
          <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-sm font-medium text-transparent transition-colors duration-300 group-hover:from-blue-400 group-hover:to-purple-400'>
            {aiUser.fullName}
          </span>
          <span className='text-xs text-zinc-400'>{aiUser.username}</span>
        </div>
      </div>

      {/* Checkmark - only one will be rendered */}
      {isSelected && (
        <div className='relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 p-0.5'>
          <IconCheck className='h-2.5 w-2.5 text-white' />
        </div>
      )}
    </div>
  )
}
