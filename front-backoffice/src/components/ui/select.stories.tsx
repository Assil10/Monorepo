import type { Meta, StoryObj } from '@storybook/react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from './select';

const meta = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// A helper to create the composed select component for stories
const SelectDemo = ({
  placeholder = "Select an option",
  disabled = false
}) => {
  return (
    <Select disabled={disabled}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
          <SelectItem value="tomato">Tomato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const Default: Story = {
  render: () => <SelectDemo />
};

export const WithCustomPlaceholder: Story = {
  render: () => <SelectDemo placeholder="Select a food item" />
};

export const Disabled: Story = {
  render: () => <SelectDemo disabled={true} />
};

export const Simple: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="red">Red</SelectItem>
        <SelectItem value="green">Green</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="yellow">Yellow</SelectItem>
        <SelectItem value="purple">Purple</SelectItem>
      </SelectContent>
    </Select>
  )
}; 