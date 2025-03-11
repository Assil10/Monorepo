import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Checkbox } from './checkbox';
import { useState } from 'react';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked by default',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" defaultChecked {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const DisabledChecked: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled defaultChecked {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms" {...args} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

// Example with controlled state
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="controlled" 
            checked={checked} 
            onCheckedChange={setChecked}
            {...args}
          />
          <Label htmlFor="controlled">
            {checked ? "Checked" : "Unchecked"}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          The checkbox is {checked ? "checked" : "unchecked"}
        </p>
      </div>
    );
  },
}; 