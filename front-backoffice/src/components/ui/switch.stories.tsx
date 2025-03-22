import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './switch';
import { Label } from './label';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
  args: {},
};

export const WithLabelJustify: Story = {
  render: (args) => (
    <div className="flex items-center justify-between space-x-2 w-48 border p-4 rounded-lg">
      <Label htmlFor="wifi" className="font-medium">WiFi</Label>
      <Switch id="wifi" {...args} />
    </div>
  ),
  args: {
    defaultChecked: true,
  },
};

// Example with controlled state
function ControlledSwitch() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex items-center space-x-2">
        <Switch 
          id="controlled-switch" 
          checked={checked} 
          onCheckedChange={setChecked}
        />
        <Label htmlFor="controlled-switch">
          {checked ? "On" : "Off"}
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        The switch is {checked ? "on" : "off"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

// Example with multiple switches in a form-like layout
export const MultipleExample: Story = {
  render: () => (
    <div className="space-y-4 w-64 border p-4 rounded-lg">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="font-medium">Notifications</Label>
          <Switch id="notifications" defaultChecked />
        </div>
        <p className="text-xs text-muted-foreground">Get notified of activity</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
          <Switch id="dark-mode" />
        </div>
        <p className="text-xs text-muted-foreground">Use dark theme</p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="sound" className="font-medium">Sound</Label>
          <Switch id="sound" defaultChecked />
        </div>
        <p className="text-xs text-muted-foreground">Play sound effects</p>
      </div>
    </div>
  ),
}; 