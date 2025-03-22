import type { Meta, StoryObj } from '@storybook/react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog';
import { Button } from './button';

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof AlertDialog>;

// We need to create a wrapper component because AlertDialog needs to be controlled
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const DestructiveAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const CustomButtons: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Confirm Action</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Update System Settings</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to change critical system settings. This may require a reboot.
            Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full sm:w-auto">Abort</AlertDialogCancel>
          <AlertDialogAction className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            Apply Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show License Agreement</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>License Agreement</AlertDialogTitle>
          <AlertDialogDescription>
            Please read the following terms and conditions carefully.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[250px] overflow-y-auto border rounded p-3 text-sm my-4">
          <p className="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, 
            nisl eget ultricies aliquam, nisl nunc aliquet nunc, eget aliquam nisl 
            nunc vel nunc. Nullam auctor, nisl eget ultricies aliquam.
          </p>
          <h4 className="font-bold mt-2 mb-1">1. Terms of Use</h4>
          <p className="mb-2">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia curae; Sed eget aliquam nisl. Nullam auctor, nisl eget ultricies 
            aliquam, nisl nunc aliquet nunc, eget aliquam nisl nunc vel nunc.
          </p>
          <h4 className="font-bold mt-2 mb-1">2. Privacy Policy</h4>
          <p className="mb-2">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia curae; Sed eget aliquam nisl. Nullam auctor, nisl eget ultricies 
            aliquam, nisl nunc aliquet nunc, eget aliquam nisl nunc vel nunc.
          </p>
          <h4 className="font-bold mt-2 mb-1">3. Liability</h4>
          <p className="mb-2">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
            cubilia curae; Sed eget aliquam nisl. Nullam auctor, nisl eget ultricies 
            aliquam, nisl nunc aliquet nunc, eget aliquam nisl nunc vel nunc.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Decline</AlertDialogCancel>
          <AlertDialogAction>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const FormDialog: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Unsubscribe</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsubscribe from our newsletter</AlertDialogTitle>
          <AlertDialogDescription>
            We're sorry to see you go. Would you mind telling us why you're unsubscribing?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="reason-1" 
                name="reason" 
                className="mr-2" 
              />
              <label htmlFor="reason-1">I receive too many emails</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="reason-2" 
                name="reason" 
                className="mr-2" 
              />
              <label htmlFor="reason-2">The content isn't relevant to me</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="reason-3" 
                name="reason" 
                className="mr-2" 
              />
              <label htmlFor="reason-3">I didn't sign up for this</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="reason-4" 
                name="reason" 
                className="mr-2" 
              />
              <label htmlFor="reason-4">Other reason</label>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm Unsubscribe</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}; 