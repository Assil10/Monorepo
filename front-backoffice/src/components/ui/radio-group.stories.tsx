import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';
import { useState } from 'react';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" disabled {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="disabled-option-one" />
        <Label htmlFor="disabled-option-one" className="text-muted-foreground">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="disabled-option-two" />
        <Label htmlFor="disabled-option-two" className="text-muted-foreground">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="disabled-option-three" />
        <Label htmlFor="disabled-option-three" className="text-muted-foreground">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-one" className="flex gap-6" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="horizontal-option-one" />
        <Label htmlFor="horizontal-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="horizontal-option-two" />
        <Label htmlFor="horizontal-option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="horizontal-option-three" />
        <Label htmlFor="horizontal-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

function ControlledRadioGroup() {
  const [value, setValue] = useState("option-one");
  
  return (
    <div className="space-y-3">
      <RadioGroup value={value} onValueChange={setValue} className="gap-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="controlled-option-one" />
          <Label htmlFor="controlled-option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="controlled-option-two" />
          <Label htmlFor="controlled-option-two">Option Two</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-three" id="controlled-option-three" />
          <Label htmlFor="controlled-option-three">Option Three</Label>
        </div>
      </RadioGroup>
      <div className="text-sm">Selected value: <span className="font-semibold">{value}</span></div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledRadioGroup />,
};

export const WithDescription: Story = {
  render: (args) => (
    <RadioGroup defaultValue="comfortable" {...args}>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="default" className="mt-1" />
        <div>
          <Label htmlFor="default">Default</Label>
          <p className="text-sm text-muted-foreground">
            The default system theme.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="comfortable" className="mt-1" />
        <div>
          <Label htmlFor="comfortable">Comfortable</Label>
          <p className="text-sm text-muted-foreground">
            More padding for better readability.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="compact" className="mt-1" />
        <div>
          <Label htmlFor="compact">Compact</Label>
          <p className="text-sm text-muted-foreground">
            Less padding to fit more content on screen.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const CardRadioGroup: Story = {
  render: (args) => (
    <RadioGroup defaultValue="card-comfortable" {...args}>
      <Label className="text-base font-medium mb-3 block">Interface Density</Label>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <div className="border rounded-md p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
            <div className="flex items-center justify-between">
              <Label htmlFor="card-default" className="cursor-pointer font-normal">Default</Label>
              <RadioGroupItem value="card-default" id="card-default" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">System default</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border rounded-md p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
            <div className="flex items-center justify-between">
              <Label htmlFor="card-comfortable" className="cursor-pointer font-normal">Comfortable</Label>
              <RadioGroupItem value="card-comfortable" id="card-comfortable" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">More padding</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border rounded-md p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
            <div className="flex items-center justify-between">
              <Label htmlFor="card-compact" className="cursor-pointer font-normal">Compact</Label>
              <RadioGroupItem value="card-compact" id="card-compact" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Less padding</p>
        </div>
      </div>
    </RadioGroup>
  ),
}; 