import type { Meta, StoryObj } from '@storybook/react';
import { Main } from './main';
import { Header } from './header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  title: 'Layout/Main',
  component: Main,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen={true}>
        <div className="w-[800px] border rounded-md overflow-hidden bg-muted/10">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof Main>;

export const Default: Story = {
  args: {
    className: 'min-h-[400px]'
  },
  render: (args) => (
    <Main {...args}>
      <h1 className="text-2xl font-bold tracking-tight mb-4">Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Welcome back! Here's an overview of your project.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
            <CardDescription>Your project performance this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content goes here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Activity content goes here</p>
          </CardContent>
        </Card>
      </div>
    </Main>
  ),
};

export const Fixed: Story = {
  args: {
    fixed: true,
    className: 'min-h-[400px]'
  },
  render: (args) => (
    <>
      <Header fixed>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </Header>
      <Main {...args}>
        <h1 className="text-2xl font-bold tracking-tight mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          This main container has fixed positioning to work with the fixed header.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Statistics</CardTitle>
              <CardDescription>Your project performance this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Content goes here</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Activity content goes here</p>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  ),
};

export const WithScrollableContent: Story = {
  args: {
    className: 'h-[400px] overflow-auto'
  },
  render: (args) => (
    <Main {...args}>
      <h1 className="text-2xl font-bold tracking-tight mb-4">Content Section</h1>
      <p className="text-muted-foreground mb-6">
        This content is scrollable within the main container.
      </p>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Section {i + 1}</CardTitle>
              <CardDescription>Description for section {i + 1}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is content for section {i + 1}. Scroll to see more sections.</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">Last updated: Today</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Main>
  ),
}; 