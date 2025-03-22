import type { Meta, StoryObj } from '@storybook/react';
import { SelectDropdown } from './select-dropdown';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/SelectDropdown',
  component: SelectDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectDropdown>;

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Pineapple', value: 'pineapple' },
];

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Brazil', value: 'br' },
];

export const Default: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Select a fruit',
    items: fruitOptions,
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'banana',
    placeholder: 'Select a fruit',
    items: fruitOptions,
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Select a fruit',
    items: [],
    isPending: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Select a fruit',
    items: fruitOptions,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const WithManyOptions: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Select a country',
    items: countryOptions,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const WithCustomClass: Story = {
  args: {
    defaultValue: '',
    placeholder: 'Custom styled select',
    items: fruitOptions,
    className: 'bg-primary/10 border-primary',
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('apple');
    
    return (
      <div className="w-[280px] space-y-4">
        <SelectDropdown 
          defaultValue={value}
          onValueChange={setValue}
          placeholder="Select a fruit"
          items={fruitOptions}
          isControlled={true}
        />
        <div className="flex flex-wrap gap-2">
          {fruitOptions.map((option) => (
            <Button 
              key={option.value} 
              variant="outline" 
              size="sm"
              onClick={() => setValue(option.value)}
              className={value === option.value ? "bg-primary text-primary-foreground" : ""}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Selected value: <span className="font-medium">{value}</span>
        </p>
      </div>
    );
  },
}; 