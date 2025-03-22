import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { ConfirmDialog } from './confirm-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    // Add explicit spies for action props
    onOpenChange: fn(),
    handleConfirm: fn()
  }
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

// Wrapper component to handle open state
const DialogWrapper = ({
  children,
  defaultOpen = false,
}: {
  children: (props: { open: boolean; setOpen: (open: boolean) => void }) => React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return <>{children({ open, setOpen })}</>;
};

export const Default: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          setOpen(newOpen);
        };
        
        const handleConfirm = () => {
          args.handleConfirm();
          toast({
            title: 'Item deleted',
            description: 'The item has been successfully deleted',
          });
          setOpen(false);
        };
        
        return (
          <>
            <Button onClick={() => setOpen(true)}>Delete Item</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Are you sure?"
              desc="This action cannot be undone. This will permanently delete this item from our servers."
              handleConfirm={handleConfirm}
            />
          </>
        );
      }}
    </DialogWrapper>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          setOpen(newOpen);
        };
        
        const handleConfirm = () => {
          args.handleConfirm();
          toast({
            title: 'Account deleted',
            description: 'Your account has been permanently deleted',
            variant: 'destructive',
          });
          setOpen(false);
        };
        
        return (
          <>
            <Button variant="destructive" onClick={() => setOpen(true)}>Delete Account</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Delete account"
              desc="Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone."
              destructive
              confirmText="Delete Account"
              handleConfirm={handleConfirm}
            />
          </>
        );
      }}
    </DialogWrapper>
  ),
};

export const WithLoadingState: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const [isLoading, setIsLoading] = React.useState(false);

        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          if (isLoading) return; // Prevent closing while loading
          setOpen(newOpen);
        };

        const handleConfirm = () => {
          args.handleConfirm();
          setIsLoading(true);
          // Simulate API call
          setTimeout(() => {
            toast({
              title: 'Success',
              description: 'Operation completed successfully',
            });
            setIsLoading(false);
            setOpen(false);
          }, 2000);
        };

        return (
          <>
            <Button onClick={() => setOpen(true)}>Publish Article</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Publish article"
              desc="Are you sure you want to publish this article? It will be visible to the public immediately."
              confirmText={isLoading ? "Publishing..." : "Publish"}
              isLoading={isLoading}
              handleConfirm={handleConfirm}
            />
          </>
        );
      }}
    </DialogWrapper>
  ),
};

export const WithCustomButtons: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          setOpen(newOpen);
        };
        
        const handleConfirm = () => {
          args.handleConfirm();
          toast({
            title: 'Project archived',
            description: 'The project has been moved to archives',
          });
          setOpen(false);
        };
        
        return (
          <>
            <Button variant="outline" onClick={() => setOpen(true)}>Archive Project</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Archive project"
              desc="Would you like to archive this project? You can restore it later from the archives section."
              confirmText="Archive"
              cancelBtnText="Keep Active"
              handleConfirm={handleConfirm}
            />
          </>
        );
      }}
    </DialogWrapper>
  ),
};

export const WithAdditionalContent: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const [reason, setReason] = React.useState('');
        
        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          setOpen(newOpen);
        };
        
        const handleConfirm = () => {
          args.handleConfirm();
          if (!reason.trim()) {
            toast({
              title: 'Error',
              description: 'Please provide a reason',
              variant: 'destructive',
            });
            return;
          }
          
          toast({
            title: 'Issue reported',
            description: 'Thank you for your feedback',
          });
          setOpen(false);
        };
        
        return (
          <>
            <Button variant="outline" onClick={() => setOpen(true)}>Report Issue</Button>
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Report issue"
              desc="Please provide details about the issue you're experiencing."
              confirmText="Submit Report"
              className="max-w-md"
              handleConfirm={handleConfirm}
            >
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Input
                    id="reason"
                    placeholder="Describe the issue..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
            </ConfirmDialog>
          </>
        );
      }}
    </DialogWrapper>
  ),
};

export const MultipleTriggers: Story = {
  render: (args) => (
    <DialogWrapper>
      {({ open, setOpen }) => {
        const handleOpenChange = (newOpen: boolean) => {
          args.onOpenChange(newOpen);
          setOpen(newOpen);
        };
        
        const handleConfirm = () => {
          args.handleConfirm();
          toast({
            title: 'Action confirmed',
            description: 'You confirmed the action',
          });
          setOpen(false);
        };
        
        return (
          <div className="flex flex-col gap-4 items-start">
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => setOpen(true)}>
                Delete
              </Button>
              <Button variant="outline" onClick={() => setOpen(true)}>
                Also Opens Dialog
              </Button>
            </div>
            
            <ConfirmDialog
              open={open}
              onOpenChange={handleOpenChange}
              title="Multiple triggers"
              desc="This dialog can be opened from multiple trigger buttons, demonstrating reusability."
              destructive
              confirmText="Confirm"
              handleConfirm={handleConfirm}
            />
          </div>
        );
      }}
    </DialogWrapper>
  ),
}; 