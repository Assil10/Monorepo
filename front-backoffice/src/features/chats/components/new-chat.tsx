import { useEffect, useState, useCallback } from 'react';
import { IconX, IconCheck } from '@tabler/icons-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChatUser } from '../data/chat-types';
import AiChatItem from './AiChatItem';

type NewChatProps = {
  users: ChatUser[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewChat({ users, open, onOpenChange }: NewChatProps) {
  const [selectedUsers, setSelectedUsers] = useState<ChatUser[]>([]);

  // Memoize to avoid unnecessary recreations
  const handleRemoveUser = useCallback((userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  }, []);

  const handleSelectUser = useCallback((user: ChatUser) => {
    setSelectedUsers((prev) => {
      if (!prev.find((u) => u.id === user.id)) {
        return [...prev, user];
      } else {
        return prev.filter((u) => u.id !== user.id);
      }
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setSelectedUsers([]);
    }
  }, [open]);

  // Renamed for clarity
  const handleChatSubmit = () => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(selectedUsers, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  // Separate out the AI user (id === 'ai') so we can show it at the top
  const ai = users.find((u) => u.id === 'ai');
  const otherUsers = users.filter((u) => u.id !== 'ai');

  // Check if AI is selected
  const isAiSelected = !!selectedUsers.find((u) => u.id === 'ai');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {/* Display selected users */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-zinc-400">To:</span>
            {selectedUsers.map((user) => (
              <Badge
                key={user.id}
                variant="default"
                className={
                  user.id === 'ai'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                    : undefined
                }
              >
                {user.fullName}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => handleRemoveUser(user.id)}
                >
                  <IconX className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          {/* Command search and selection */}
          <Command className="rounded-lg border">
            <CommandInput
              placeholder="Search people..."
              className="text-foreground"
            />
            <CommandList>
              <CommandEmpty>No people found.</CommandEmpty>
              <CommandGroup>
                {/* AI Chat option always at the top (if found) */}
                {ai && (
                  <CommandItem
                    value={`ai-${ai.fullName}-${ai.username}`}
                    onSelect={() => handleSelectUser(ai)}
                    className="hover:bg-gray-100/50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2 relative">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-sm transition-all duration-300"></div>
                          <img
                            src={ai.profile || '/placeholder.svg'}
                            alt={ai.fullName}
                            className="h-8 w-8 rounded-full relative z-10 border border-blue-300/50"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {ai.fullName}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {ai.username}
                          </span>
                        </div>
                      </div>
                      {isAiSelected && (
                        <IconCheck className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </CommandItem>
                )}
                {/* Special divider after AI */}
                {ai && (
                  <div className="px-2 py-1.5">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
                  </div>
                )}
                {/* Regular user list */}
                {otherUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={`${user.id}-${user.fullName}-${user.username}`}
                    onSelect={() => handleSelectUser(user)}
                    className="hover:bg-gray-100/50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={user.profile || '/placeholder.svg'}
                          alt={user.fullName}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {user.fullName}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {user.username}
                          </span>
                        </div>
                      </div>
                      {selectedUsers.find((u) => u.id === user.id) && (
                        <IconCheck className="h-4 w-4" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button
            variant="default"
            onClick={handleChatSubmit}
            disabled={selectedUsers.length === 0}
            className={
              isAiSelected
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                : undefined
            }
          >
            Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}