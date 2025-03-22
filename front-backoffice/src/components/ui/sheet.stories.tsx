import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from './sheet';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@johndoe" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate to different sections of the application.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            {['Dashboard', 'Projects', 'Team', 'Reports', 'Settings'].map((item) => (
              <Button key={item} variant="ghost" className="justify-start">
                {item}
              </Button>
            ))}
          </div>
        </div>
        <SheetFooter className="sm:justify-start">
          <Button variant="outline">Log out</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-[30vh]">
        <SheetHeader>
          <SheetTitle>Notification</SheetTitle>
          <SheetDescription>
            Important system notification.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">
            The system will be undergoing scheduled maintenance on Sunday, June 12th at 02:00 UTC.
            Please save your work and log out before this time.
          </p>
        </div>
        <SheetFooter>
          <Button type="submit">Acknowledge</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[40vh]">
        <SheetHeader>
          <SheetTitle>Music player</SheetTitle>
          <SheetDescription>
            Currently playing playlist.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-md bg-gray-300"></div>
              <div>
                <h3 className="font-medium">Song Title</h3>
                <p className="text-sm text-muted-foreground">Artist Name</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1 w-full rounded-full bg-gray-200">
                <div className="h-1 w-1/3 rounded-full bg-primary"></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>
            <div className="flex justify-center gap-8">
              <Button size="icon" variant="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" x2="5" y1="19" y2="5"></line></svg>
              </Button>
              <Button size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </Button>
              <Button size="icon" variant="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" x2="19" y1="5" y2="19"></line></svg>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Contact Support</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Contact Support</SheetTitle>
          <SheetDescription>
            Send a message to our customer support team and we'll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <form className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Brief description of your issue" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Please provide as much detail as possible about your issue"
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select id="priority" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="attachLogs" className="rounded border-gray-300" />
            <Label htmlFor="attachLogs">Attach system logs</Label>
          </div>
        </form>
        <SheetFooter>
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Submit</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

function ControlledSheetDemo() {
  const [open, setOpen] = useState(false);
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Controlled Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controlled Sheet</SheetTitle>
          <SheetDescription>
            This sheet is controlled using React state.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <p className="text-sm text-muted-foreground">
            You can programmatically control this sheet using the setOpen function.
          </p>
        </div>
        <SheetFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setTimeout(() => setOpen(false), 1000);
            }}
          >
            Close after 1 second
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSheetDemo />,
}; 