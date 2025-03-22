import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { CheckIcon, Settings } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover (Start)</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Aligned to Start</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the start of the trigger.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover (End)</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Aligned to End</h4>
            <p className="text-sm text-muted-foreground">
              This popover is aligned to the end of the trigger.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const IconTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your application settings.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="theme">Theme</Label>
              <select id="theme" className="col-span-2 h-8 rounded border px-2">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="notifications">Notifications</Label>
              <input
                id="notifications"
                type="checkbox"
                className="col-span-2 h-4 w-4"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Add New Contact</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">New Contact</h4>
            <p className="text-sm text-muted-foreground">
              Add a new contact to your address book.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" className="h-8" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter email" className="h-8" />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="sm">Add Contact</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  ),
};

function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Controlled Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Controlled Popover</h4>
            <p className="text-sm text-muted-foreground">
              This popover is controlled using React state.
            </p>
          </div>
          <div className="flex justify-between">
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                setOpen(false);
                // Additional confirmation logic would go here
              }}
            >
              <CheckIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const Controlled: Story = {
  render: () => <ControlledPopoverDemo />,
}; 