import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Search } from '@/components/search';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, MessageSquare, Plus } from 'lucide-react';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[800px] border rounded-md overflow-hidden">
          <Story />
          <div className="p-4 h-[300px]">
            <p className="text-muted-foreground">Content area below header</p>
          </div>
        </div>
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Header {...args}>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </Header>
  ),
};

export const Fixed: Story = {
  args: {
    fixed: true,
  },
  render: (args) => (
    <Header {...args}>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </Header>
  ),
};

export const WithSearch: Story = {
  args: {},
  render: (args) => (
    <Header {...args}>
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="ml-auto flex items-center gap-4">
        <Search />
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </Header>
  ),
};

export const WithActions: Story = {
  args: {},
  render: (args) => (
    <Header {...args}>
      <h2 className="text-lg font-semibold">Project Tasks</h2>
      <div className="ml-auto flex items-center gap-3">
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button size="sm">
          <Plus className="mr-1 h-4 w-4" /> New Task
        </Button>
      </div>
    </Header>
  ),
}; 