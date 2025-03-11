import type { Meta, StoryObj } from '@storybook/react';
import ContentSection from './content-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const meta = {
  title: 'Features/Settings/ContentSection',
  component: ContentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
  args: {
    title: 'Profile',
    desc: 'Manage your personal information and how it is displayed.',
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="john.doe@example.com" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" defaultValue="Software engineer and designer." />
        </div>
        <Button>Update profile</Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md p-4 w-[500px] h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithScrollableContent: Story = {
  args: {
    title: 'Preferences',
    desc: 'Customize your application settings and preferences.',
    children: (
      <div className="space-y-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-medium">Setting Option {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  Description for setting option {i + 1}. This explains what this setting does.
                </p>
              </div>
              <Switch />
            </CardContent>
          </Card>
        ))}
        <Button className="mt-4">Save preferences</Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md p-4 w-[500px] h-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithComplexForm: Story = {
  args: {
    title: 'Account Settings',
    desc: 'Manage your account settings and connected services.',
    children: (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Personal Information</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" defaultValue="Doe" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john.doe@example.com" type="email" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-3">Notification Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="marketing" className="cursor-pointer">Email marketing</Label>
              <Switch id="marketing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="updates" className="cursor-pointer">Product updates</Label>
              <Switch id="updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="comments" className="cursor-pointer">Comment notifications</Label>
              <Switch id="comments" defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="border rounded-md p-4 w-[500px] h-[500px]">
        <Story />
      </div>
    ),
  ],
}; 