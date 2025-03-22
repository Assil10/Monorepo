import type { Meta, StoryObj } from '@storybook/react';
import { NavUser } from './nav-user';
import { SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  title: 'Layout/NavUser',
  component: NavUser,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] w-[300px] border rounded-md overflow-hidden">
        <SidebarProvider defaultOpen={true}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NavUser>;

export default meta;
type Story = StoryObj<typeof NavUser>;

export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://github.com/shadcn.png',
    }
  }
};

export const WithLongName: Story = {
  args: {
    user: {
      name: 'Alexandra Richardson-Montgomery',
      email: 'alexandra.richardson.montgomery@verylongcompanyname.com',
      avatar: 'https://github.com/shadcn.png',
    }
  }
};

export const NoAvatar: Story = {
  args: {
    user: {
      name: 'Sam Wilson',
      email: 'sam.wilson@example.com',
      avatar: '',
    }
  }
};

export const CollapsedSidebar: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://github.com/shadcn.png',
    }
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] border rounded-md overflow-hidden">
        <SidebarProvider defaultOpen={false}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
}; 