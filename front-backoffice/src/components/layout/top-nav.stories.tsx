import type { Meta, StoryObj } from '@storybook/react';
import { TopNav } from './top-nav';

const meta = {
  title: 'Layout/TopNav',
  component: TopNav,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {
  args: {
    links: [
      {
        title: 'Dashboard',
        href: '/',
        isActive: true,
      },
      {
        title: 'Projects',
        href: '/projects',
        isActive: false,
      },
      {
        title: 'Tasks',
        href: '/tasks',
        isActive: false,
      },
      {
        title: 'Reports',
        href: '/reports',
        isActive: false,
      },
      {
        title: 'Settings',
        href: '/settings',
        isActive: false,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDisabledLinks: Story = {
  args: {
    links: [
      {
        title: 'Dashboard',
        href: '/',
        isActive: true,
      },
      {
        title: 'Projects',
        href: '/projects',
        isActive: false,
      },
      {
        title: 'Tasks',
        href: '/tasks',
        isActive: false,
      },
      {
        title: 'Reports',
        href: '/reports',
        isActive: false,
        disabled: true,
      },
      {
        title: 'Settings',
        href: '/settings',
        isActive: false,
        disabled: true,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {
    links: [
      {
        title: 'Dashboard',
        href: '/',
        isActive: true,
      },
      {
        title: 'Projects',
        href: '/projects',
        isActive: false,
      },
      {
        title: 'Tasks',
        href: '/tasks',
        isActive: false,
      },
      {
        title: 'Reports',
        href: '/reports',
        isActive: false,
      },
      {
        title: 'Settings',
        href: '/settings',
        isActive: false,
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
      <div className="p-4 border rounded-md" style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithManyLinks: Story = {
  args: {
    links: [
      {
        title: 'Dashboard',
        href: '/',
        isActive: true,
      },
      {
        title: 'Projects',
        href: '/projects',
        isActive: false,
      },
      {
        title: 'Tasks',
        href: '/tasks',
        isActive: false,
      },
      {
        title: 'Reports',
        href: '/reports',
        isActive: false,
      },
      {
        title: 'Analytics',
        href: '/analytics',
        isActive: false,
      },
      {
        title: 'Customers',
        href: '/customers',
        isActive: false,
      },
      {
        title: 'Products',
        href: '/products',
        isActive: false,
      },
      {
        title: 'Invoices',
        href: '/invoices',
        isActive: false,
      },
      {
        title: 'Settings',
        href: '/settings',
        isActive: false,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '800px', overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
}; 