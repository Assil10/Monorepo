import { Fragment } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChatUser } from '../data/chat-types';

type ChatListProps = {
  users: ChatUser[];
  selectedUser: ChatUser | null;
  onSelectUser: (user: ChatUser) => void;
  search: string;
};

export function ChatList({ users, selectedUser, onSelectUser, search }: ChatListProps) {
  const filteredUsers = users.filter(({ fullName }) =>
    fullName.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <ScrollArea className="-mx-3 h-full p-3">
      {filteredUsers.map((chatUsr) => {
        const { id, profile, username, messages, fullName } = chatUsr;
        const lastConvo = messages[0];
        const lastMsg =
          lastConvo.sender === 'You'
            ? `You: ${lastConvo.message}`
            : lastConvo.message;
        const isAI = id === 'ai';

        return (
          <Fragment key={id}>
            <button
              type="button"
              className={cn(
                `-mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm relative group`,
                selectedUser?.id === id ? 'sm:bg-muted' : 'hover:bg-secondary/75',
                isAI && 'overflow-hidden' // Keeping same padding as other contacts
              )}
              onClick={() => onSelectUser(chatUsr)}
            >
              {/* Enhanced effects for AI chat */}
              {isAI && (
                <>
                  {/* Removed gradient background */}
                  {/* Animated border effect */}
                  <div
                    className="absolute inset-0 rounded-md border border-blue-400/40 group-hover:border-blue-400/70 shadow-[0_0_5px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"
                  ></div>
                </>
              )}

              <div className={cn('flex gap-2 relative z-10', isAI && 'w-full')}>
                {/* Enhanced avatar styling for AI */}
                <div className={cn('relative', isAI && 'flex-shrink-0')}>
                  {isAI && (
                    <>
                      {/* Pulsing ring animation */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-30 bg-transparent border border-blue-400 scale-125"
                      ></div>
                    </>
                  )}
                  <Avatar className={isAI ? 'border border-blue-300/70 shadow-md shadow-blue-500/20' : ''}>
                    <AvatarImage src={profile} alt={username} />
                    <AvatarFallback>{username}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  {/* Keep font size consistent but add special styling for AI */}
                  <div className="flex items-center">
                    <span
                      className={cn(
                        'col-start-2 row-span-2 font-medium',
                        isAI &&
                          'bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-colors duration-300'
                      )}
                    >
                      {fullName}
                    </span>

                    {/* Small AI badge */}
                    {isAI && (
                      <span
                        className="ml-2 px-1 py-0.5 text-xs rounded-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white font-medium leading-none"
                      >
                        AI
                      </span>
                    )}
                  </div>

                  <span
                    className={cn(
                      'col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground',
                      isAI && 'text-blue-500/70 group-hover:text-blue-600/80'
                    )}
                  >
                    {lastMsg}
                  </span>
                </div>
              </div>
            </button>
            <Separator
              className={cn('my-1', isAI && 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent')}
            />
          </Fragment>
        );
      })}
    </ScrollArea>
  );
}