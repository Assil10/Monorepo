import { Fragment } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconPhone,
  IconVideo,
  IconPlus,
  IconPhotoPlus,
  IconPaperclip,
  IconSend,
} from '@tabler/icons-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ChatUser, Convo } from '../data/chat-types';

type ConversationPanelProps = {
  selectedUser: ChatUser;
  mobileSelectedUser: ChatUser | null;
  onBack: () => void;
};

export function ConversationPanel({ selectedUser, mobileSelectedUser, onBack }: ConversationPanelProps) {
  // Group messages by date for the selected user
  const currentMessage = selectedUser.messages.reduce((acc: Record<string, Convo[]>, msg) => {
    const dateKey = format(new Date(msg.timestamp), 'd MMM, yyyy');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(msg);
    return acc;
  }, {});

  return (
    <div
      className={cn(
        'absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex',
        mobileSelectedUser && 'left-0 flex'
      )}
    >
      {/* Conversation Header */}
      <div className="mb-1 flex flex-none justify-between rounded-t-md bg-secondary p-4 shadow-lg">
        <div className="flex gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="-ml-2 h-full sm:hidden"
            onClick={onBack}
          >
            <IconArrowLeft />
          </Button>
          <div className="flex items-center gap-2 lg:gap-4">
            <Avatar className="size-9 lg:size-11">
              <AvatarImage src={selectedUser.profile} alt={selectedUser.username} />
              <AvatarFallback>{selectedUser.username}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium lg:text-base">
                {selectedUser.fullName}
              </span>
              <span className="mt-1 text-xs text-muted-foreground lg:text-sm">
                {selectedUser.title}
              </span>
            </div>
          </div>
        </div>
        <div className="-mr-1 flex items-center gap-1 lg:gap-2">
          <Button size="icon" variant="ghost" className="hidden size-8 rounded-full sm:inline-flex lg:size-10">
            <IconVideo size={22} className="stroke-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost" className="hidden size-8 rounded-full sm:inline-flex lg:size-10">
            <IconPhone size={22} className="stroke-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost" className="h-10 rounded-md sm:h-8 sm:w-4 lg:h-10 lg:w-6">
            <IconDotsVertical className="stroke-muted-foreground sm:size-5" />
          </Button>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="flex flex-1 flex-col gap-2 rounded-md px-4 pb-4 pt-0">
        <div className="flex flex-1">
          <div className="chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden">
            <div className="chat-flex flex w-full flex-grow flex-col-reverse justify-start gap-3 overflow-y-auto py-2 pb-4 pr-4">
              {Object.keys(currentMessage).map((dateKey) => (
                <Fragment key={dateKey}>
                  {currentMessage[dateKey].map((msg, index) => (
                    <div
                      key={`${msg.sender}-${msg.timestamp}-${index}`}
                      className={cn(
                        'chat-box m-1 max-w-72 break-words px-3 py-2 shadow-lg',
                        msg.sender === 'You'
                          ? 'self-end rounded-[16px_16px_0_16px] bg-primary/85 text-primary-foreground/75'
                          : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                      )}
                    >
                      {msg.message}{' '}
                      <span
                        className={cn(
                          'mt-1 block text-xs font-light italic text-muted-foreground',
                          msg.sender === 'You' && 'text-right'
                        )}
                      >
                        {format(new Date(msg.timestamp), 'h:mm a')}
                      </span>
                    </div>
                  ))}
                  <div className="text-center text-xs">{dateKey}</div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <form className="flex w-full flex-none gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-input px-2 py-1 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring lg:gap-4">
            <div className="space-x-1">
              <Button size="icon" type="button" variant="ghost" className="h-8 rounded-md">
                <IconPlus size={20} className="stroke-muted-foreground" />
              </Button>
              <Button size="icon" type="button" variant="ghost" className="hidden h-8 rounded-md lg:inline-flex">
                <IconPhotoPlus size={20} className="stroke-muted-foreground" />
              </Button>
              <Button size="icon" type="button" variant="ghost" className="hidden h-8 rounded-md lg:inline-flex">
                <IconPaperclip size={20} className="stroke-muted-foreground" />
              </Button>
            </div>
            <label className="flex-1">
              <span className="sr-only">Chat Text Box</span>
              <input
                type="text"
                placeholder="Type your messages..."
                className="h-8 w-full bg-inherit focus-visible:outline-none"
              />
            </label>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <IconSend size={20} />
            </Button>
          </div>
          <Button className="h-full sm:hidden">
            <IconSend size={18} /> Send
          </Button>
        </form>
      </div>
    </div>
  );
}
