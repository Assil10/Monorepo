import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { InfoIcon, AlertTriangleIcon, AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'The variant of the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    className: 'w-[450px]',
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again to continue.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
    className: 'w-[450px]',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This action will result in the permanent deletion of your account.
      </AlertDescription>
    </Alert>
  ),
  args: {
    className: 'w-[450px]',
  },
};

export const DestructiveWithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertCircleIcon className="h-4 w-4" />
      <AlertTitle>Critical Error</AlertTitle>
      <AlertDescription>
        The operation could not be completed. Please try again later.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
    className: 'w-[450px]',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[450px]">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This information is for your reference.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-yellow-500 text-yellow-800 dark:text-yellow-400 [&>svg]:text-yellow-500">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Your account is about to reach its usage limit.
        </AlertDescription>
      </Alert>
      
      <Alert className="border-green-500 text-green-800 dark:text-green-400 [&>svg]:text-green-500">
        <CheckCircle2Icon className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your changes have been saved successfully.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        A simple alert with only description text.
      </AlertDescription>
    </Alert>
  ),
  args: {
    className: 'w-[450px]',
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        <p>A new software update is available for your system.</p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">
            Update Now
          </button>
          <button className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded">
            Remind Me Later
          </button>
        </div>
      </AlertDescription>
    </Alert>
  ),
  args: {
    className: 'w-[450px]',
  },
}; 