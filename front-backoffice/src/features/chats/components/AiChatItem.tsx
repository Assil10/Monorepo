import { IconCheck } from '@tabler/icons-react';

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
  return (
    <div
      onClick={onSelect}
      className="flex items-center justify-between gap-2 cursor-pointer p-2 hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        <img
          src={aiUser.profile}
          alt={aiUser.fullName}
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{aiUser.fullName}</span>
          <span className="text-xs text-zinc-400">{aiUser.username}</span>
        </div>
      </div>
      {isSelected && <IconCheck className="h-4 w-4" />}
    </div>
  );
}
