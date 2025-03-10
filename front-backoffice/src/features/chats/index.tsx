import { useState } from 'react';
import { IconArrowLeft, IconEdit, IconMessages, IconSearch } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ChatUser } from './data/chat-types';
import { NewChat } from '../chats/components/new-chat';
import { ChatList } from '../chats/components/ChatList';
import { ConversationPanel } from '../chats/components/ConversationPanel';

// Import your AI icon (ensure the path is correct)
import aiIcon from '@/assets/chatbotInternLogo.png';

// Fake conversation data
import { conversations } from './data/convo.json';

// Define the AI user
const aiUser: ChatUser = {
  id: 'ai',
  fullName: 'Chat with AI',
  username: 'AI Assistant',
  profile: aiIcon,
  title: 'AI Chat',
  messages: [
    {
      sender: 'AI Assistant',
      message: 'Hello! How can I help you today?',
      timestamp: '2025-03-07T12:00:00.000Z',
    },
  ],
};

export default function Chats() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(null);
  const [createConversationDialogOpened, setCreateConversationDialog] = useState(false);

  // Combine the AI user with your conversation data
  const users: ChatUser[] = [aiUser, ...conversations];

  return (
    <>
      {/* Top Header */}
      <Header>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <section className="flex h-full gap-6">
          {/* Chat List Panel */}
          <div className="flex w-full flex-col gap-2 sm:w-56 lg:w-72 2xl:w-80">
            <div className="sticky top-0 z-10 -mx-4 bg-background px-4 pb-3 shadow-md sm:static sm:z-auto sm:mx-0 sm:p-0 sm:shadow-none">
              <div className="flex items-center justify-between py-2">
                <div className="flex gap-2">
                  <h1 className="text-2xl font-bold">Inbox</h1>
                  <IconMessages size={20} />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setCreateConversationDialog(true)}
                  className="rounded-lg"
                >
                  <IconEdit size={24} className="stroke-muted-foreground" />
                </Button>
              </div>
              <label className="flex h-12 w-full items-center space-x-0 rounded-md border border-input pl-2 focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
                <IconSearch size={15} className="mr-2" />
                <span className="sr-only">Search</span>
                <input
                  type="text"
                  className="w-full flex-1 bg-inherit text-sm focus-visible:outline-none"
                  placeholder="Search chat..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>
            <ChatList
              users={users}
              selectedUser={selectedUser}
              onSelectUser={(user) => {
                setSelectedUser(user);
                setMobileSelectedUser(user);
              }}
              search={search}
            />
          </div>

          {/* Conversation Panel */}
          {selectedUser ? (
            <ConversationPanel
              selectedUser={selectedUser}
              mobileSelectedUser={mobileSelectedUser}
              onBack={() => setMobileSelectedUser(null)}
            />
          ) : (
            <div className="absolute inset-0 left-full z-50 hidden w-full flex-1 flex-col justify-center rounded-md border bg-primary-foreground shadow-sm transition-all duration-200 sm:static sm:z-auto sm:flex">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
                  <IconMessages className="h-8 w-8" />
                </div>
                <div className="space-y-2 text-center">
                  <h1 className="text-xl font-semibold">Your messages</h1>
                  <p className="text-sm text-gray-400">Send a message to start a chat.</p>
                </div>
                <Button
                  className="bg-blue-500 px-6 text-white hover:bg-blue-600"
                  onClick={() => setCreateConversationDialog(true)}
                >
                  Send message
                </Button>
              </div>
            </div>
          )}
        </section>

        {/* New Chat Dialog */}
        <NewChat
          users={users}
          onOpenChange={setCreateConversationDialog}
          open={createConversationDialogOpened}
        />
      </Main>
    </>
  );
}
