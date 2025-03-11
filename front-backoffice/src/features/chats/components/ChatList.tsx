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
        return (
          <Fragment key={id}>
            <button
              type="button"
              className={cn(
                `-mx-1 flex w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary/75`,
                selectedUser?.id === id && 'sm:bg-muted'
              )}
              onClick={() => onSelectUser(chatUsr)}
            >
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={profile} alt={username} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="col-start-2 row-span-2 font-medium">
                    {fullName}
                  </span>
                  <span className="col-start-2 row-span-2 row-start-2 line-clamp-2 text-ellipsis text-muted-foreground">
                    {lastMsg}
                  </span>
                </div>
              </div>
            </button>
            <Separator className="my-1" />
          </Fragment>
        );
      })}
    </ScrollArea>
  );
}
