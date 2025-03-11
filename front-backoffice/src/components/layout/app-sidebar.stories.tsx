import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const meta = {
  title: 'Layout/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] border rounded-lg overflow-hidden flex">
        <SidebarProvider defaultOpen={true}>
          <Story />
          <div className="flex-1 p-4 bg-muted/20">
            <div className="p-4 h-full border rounded-md bg-background">
              <h2 className="text-lg font-semibold">Main Content Area</h2>
              <p className="text-muted-foreground mt-2">
                This is where your main application content would be displayed.
                Try using the sidebar navigation options or toggling the sidebar state.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  args: {},
};

export const CollapsedInitially: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="h-[600px] border rounded-lg overflow-hidden flex">
        <SidebarProvider defaultOpen={false}>
          <Story />
          <div className="flex-1 p-4 bg-muted/20">
            <div className="p-4 h-full border rounded-md bg-background">
              <h2 className="text-lg font-semibold">Main Content Area</h2>
              <p className="text-muted-foreground mt-2">
                The sidebar starts collapsed in this example.
                Click the rail or use the keyboard shortcut to expand it.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
}; 