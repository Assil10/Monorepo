import type { Meta, StoryObj } from '@storybook/react';
import SidebarNav from './sidebar-nav';
import {
  IconUser,
  IconSettings,
  IconBell,
  IconBrush,
  IconDeviceDesktop,
  IconLock,
  IconKey,
  IconWallet,
} from '@tabler/icons-react';

const meta = {
  title: 'Features/Settings/SidebarNav',
  component: SidebarNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  args: {
    items: [
      {
        href: '/settings',
        title: 'Profile',
        icon: <IconUser className="h-4 w-4" />,
      },
      {
        href: '/settings/account',
        title: 'Account',
        icon: <IconSettings className="h-4 w-4" />,
      },
      {
        href: '/settings/appearance',
        title: 'Appearance',
        icon: <IconBrush className="h-4 w-4" />,
      },
      {
        href: '/settings/notifications',
        title: 'Notifications',
        icon: <IconBell className="h-4 w-4" />,
      },
      {
        href: '/settings/display',
        title: 'Display',
        icon: <IconDeviceDesktop className="h-4 w-4" />,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md w-[220px]">
        <Story />
      </div>
    ),
  ],
};

export const WithManyItems: Story = {
  args: {
    items: [
      {
        href: '/settings',
        title: 'Profile',
        icon: <IconUser className="h-4 w-4" />,
      },
      {
        href: '/settings/account',
        title: 'Account',
        icon: <IconSettings className="h-4 w-4" />,
      },
      {
        href: '/settings/appearance',
        title: 'Appearance',
        icon: <IconBrush className="h-4 w-4" />,
      },
      {
        href: '/settings/notifications',
        title: 'Notifications',
        icon: <IconBell className="h-4 w-4" />,
      },
      {
        href: '/settings/display',
        title: 'Display',
        icon: <IconDeviceDesktop className="h-4 w-4" />,
      },
      {
        href: '/settings/security',
        title: 'Security',
        icon: <IconLock className="h-4 w-4" />,
      },
      {
        href: '/settings/api-keys',
        title: 'API Keys',
        icon: <IconKey className="h-4 w-4" />,
      },
      {
        href: '/settings/billing',
        title: 'Billing',
        icon: <IconWallet className="h-4 w-4" />,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md w-[220px] h-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {
    items: [
      {
        href: '/settings',
        title: 'Profile',
        icon: <IconUser className="h-4 w-4" />,
      },
      {
        href: '/settings/account',
        title: 'Account',
        icon: <IconSettings className="h-4 w-4" />,
      },
      {
        href: '/settings/appearance',
        title: 'Appearance',
        icon: <IconBrush className="h-4 w-4" />,
      },
      {
        href: '/settings/notifications',
        title: 'Notifications',
        icon: <IconBell className="h-4 w-4" />,
      },
      {
        href: '/settings/display',
        title: 'Display',
        icon: <IconDeviceDesktop className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md w-full p-4">
        <Story />
      </div>
    ),
  ],
}; 