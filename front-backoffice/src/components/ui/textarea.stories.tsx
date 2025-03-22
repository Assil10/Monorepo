import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from './label';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
    className: 'w-[300px]',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" {...args} />
    </div>
  ),
  args: {
    placeholder: 'Type your message here.',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'This is some default text that appears in the textarea.',
    className: 'w-[300px]',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'This textarea is disabled and cannot be edited.',
    className: 'w-[300px]',
  },
};

export const WithRows: Story = {
  args: {
    rows: 10,
    placeholder: 'This textarea has 10 rows',
    className: 'w-[300px]',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'This textarea is read-only. You cannot edit this text.',
    className: 'w-[300px]',
  },
};

export const Required: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor="required-message" className="text-base">Your message</Label>
        <span className="text-sm text-red-500">*</span>
      </div>
      <Textarea id="required-message" {...args} />
      <p className="text-sm text-muted-foreground">This field is required</p>
    </div>
  ),
  args: {
    required: true,
    placeholder: 'Required field',
  },
};

export const WithCustomStyling: Story = {
  args: {
    placeholder: 'Custom styled textarea',
    className: 'w-[300px] border-purple-500 focus-visible:ring-purple-500',
  },
}; 