import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from './button';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// Static Toast examples
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Toast Title</ToastTitle>
          <ToastDescription>Toast description text goes here.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>New message</ToastTitle>
          <ToastDescription>You have 3 unread messages.</ToastDescription>
        </div>
        <ToastAction altText="View messages" asChild>
          <Button variant="outline" size="sm">View</Button>
        </ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive: Story = {
  render: () => (
    <ToastProvider>
      <Toast variant="destructive">
        <div className="grid gap-1">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong. Please try again.</ToastDescription>
        </div>
        <ToastAction altText="Try again" asChild>
          <Button variant="outline" size="sm">Try Again</Button>
        </ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

// Interactive toast demo
function ToastDemo() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<'default' | 'destructive'>('default');
  
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-2">
        <Button 
          onClick={() => {
            setVariant('default');
            setOpen(true);
          }}
        >
          Show Default Toast
        </Button>
        <Button 
          variant="destructive"
          onClick={() => {
            setVariant('destructive');
            setOpen(true);
          }}
        >
          Show Error Toast
        </Button>
      </div>
      
      <ToastProvider>
        <Toast 
          variant={variant} 
          open={open} 
          onOpenChange={setOpen}
        >
          <div className="grid gap-1">
            <ToastTitle>{variant === 'default' ? 'Notification' : 'Error'}</ToastTitle>
            <ToastDescription>
              {variant === 'default' 
                ? 'Your action was completed successfully.' 
                : 'There was a problem with your request.'}
            </ToastDescription>
          </div>
          {variant === 'destructive' && (
            <ToastAction altText="Try again" asChild>
              <Button variant="outline" size="sm">Try Again</Button>
            </ToastAction>
          )}
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <ToastDemo />,
}; 