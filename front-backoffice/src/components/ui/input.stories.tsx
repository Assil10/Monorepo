import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'],
      description: 'The type of the input',
      defaultValue: 'text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      defaultValue: false,
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text here',
    className: 'w-[300px]',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    className: 'w-[300px]',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
    className: 'w-[300px]',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '123',
    className: 'w-[300px]',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
    className: 'w-[300px]',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'Read-only input',
    className: 'w-[300px]',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="relative w-[300px]">
      <Input {...args} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  ),
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}; 