import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
    className: { control: 'text' },
    decorative: { control: 'boolean' },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    className: 'w-[300px]',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-[100px]',
  },
  decorators: [
    (Story) => (
      <div className="h-[100px] flex items-center">
        {Story()}
      </div>
    ),
  ],
};

export const CustomColor: Story = {
  args: {
    orientation: 'horizontal',
    className: 'w-[300px] bg-primary',
  },
};

export const WithText: Story = {
  render: (args) => (
    <div className="w-[300px] space-y-4">
      <div className="text-lg font-medium">Section Title</div>
      <p className="text-sm text-muted-foreground">
        This is a section with text content that is separated from other sections.
      </p>
      <Separator {...args} />
      <div className="text-lg font-medium">Another Section</div>
      <p className="text-sm text-muted-foreground">
        This is another section with different content.
      </p>
    </div>
  ),
};

export const InNavigation: Story = {
  render: (args) => (
    <div className="w-[200px] space-y-2">
      <div className="font-medium">Main Menu</div>
      <nav className="flex flex-col space-y-1">
        <a href="#" className="text-sm hover:underline">Home</a>
        <a href="#" className="text-sm hover:underline">Dashboard</a>
        <a href="#" className="text-sm hover:underline">Settings</a>
      </nav>
      <Separator {...args} className="my-2" />
      <div className="font-medium">Other</div>
      <nav className="flex flex-col space-y-1">
        <a href="#" className="text-sm hover:underline">Help</a>
        <a href="#" className="text-sm hover:underline">Logout</a>
      </nav>
    </div>
  ),
};

export const BetweenItems: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Product</h4>
          <p className="text-sm text-muted-foreground">T-Shirt</p>
        </div>
        <div className="font-medium">$25.00</div>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Product</h4>
          <p className="text-sm text-muted-foreground">Hoodie</p>
        </div>
        <div className="font-medium">$45.00</div>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Total</h4>
        </div>
        <div className="font-medium">$70.00</div>
      </div>
    </div>
  ),
};

export const BesideVerticalSeparator: Story = {
  render: () => (
    <div className="flex h-[100px] items-center">
      <div className="w-[100px] text-center">Left Content</div>
      <Separator orientation="vertical" className="mx-4 h-full" />
      <div className="w-[100px] text-center">Right Content</div>
    </div>
  ),
}; 