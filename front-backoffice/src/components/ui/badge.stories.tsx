import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';
import { Check, X } from 'lucide-react';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The variant of the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args}>
      <Check className="mr-1 h-3 w-3" />
      Complete
    </Badge>
  ),
  args: {
    variant: 'default',
  },
};

export const WithDestructiveIcon: Story = {
  render: (args) => (
    <Badge {...args}>
      <X className="mr-1 h-3 w-3" />
      Rejected
    </Badge>
  ),
  args: {
    variant: 'destructive',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const StatusPills: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="rounded-full">Active</Badge>
      <Badge variant="secondary" className="rounded-full">Pending</Badge>
      <Badge variant="destructive" className="rounded-full">Failed</Badge>
      <Badge variant="outline" className="rounded-full">Draft</Badge>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
      <Badge className="bg-amber-500 hover:bg-amber-600">Warning</Badge>
      <Badge className="bg-emerald-500 hover:bg-emerald-600">Success</Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600">Beta</Badge>
    </div>
  ),
}; 