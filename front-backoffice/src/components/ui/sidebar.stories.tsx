import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Home, Settings, Users, Box, FileText, BarChart, Layers } from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail
} from './sidebar';

// Layout for stories
const StorybookLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[600px] border rounded-md overflow-hidden">
    <div className="flex h-full">
      {children}
      <div className="flex-1 p-4 bg-muted/20">
        <div className="p-4 h-full border rounded-md bg-background">
          <h2 className="text-lg font-semibold">Main Content Area</h2>
          <p className="text-muted-foreground mt-2">
            This is where your main application content would be displayed.
            Try using the sidebar navigation options or toggling the sidebar state.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <SidebarProvider defaultOpen={true}>
        <StorybookLayout>
          <Story />
        </StorybookLayout>
      </SidebarProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Basic example with navigation items
export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Dashboard">
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Products">
              <Box />
              <span>Products</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports">
              <FileText />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <BarChart />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">
            © 2023 Company Inc.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  ),
};

// Sidebar with groups
export const WithGroups: Story = {
  render: () => (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Company CRM</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Projects">
                <Layers />
                <span>Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Customers">
                <Users />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Products">
                <Box />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Invoices">
                <FileText />
                <span>Invoices</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Analytics">
                <BarChart />
                <span>Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
};

// Dynamically toggling sidebar state
function ToggleableSidebar() {
  const [expanded, setExpanded] = useState(true);
  
  // This emulates the keyboard shortcut functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'b') {
        setExpanded(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <Sidebar defaultState={expanded ? 'expanded' : 'collapsed'}>
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Dashboard">
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">
            Press 'b' to toggle sidebar
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export const Toggleable: Story = {
  render: () => <ToggleableSidebar />,
  decorators: [
    (Story) => (
      <StorybookLayout>
        <Story />
      </StorybookLayout>
    ),
  ],
};

// Sidebar with trigger button
export const WithTrigger: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Users">
                <Users />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-3 py-2">
            <p className="text-xs text-muted-foreground">
              Click the button in the header to toggle
            </p>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  ),
  decorators: [
    (Story) => (
      <StorybookLayout>
        <Story />
      </StorybookLayout>
    ),
  ],
};

// Floating sidebar variant
export const FloatingVariant: Story = {
  render: () => (
    <Sidebar variant="floating">
      <SidebarHeader>
        <h2 className="text-xl font-semibold">Floating Sidebar</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Dashboard">
              <Home />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  ),
};

// Sidebar with inset variant and rail
export const InsetWithRail: Story = {
  render: () => (
    <>
      <Sidebar variant="inset">
        <SidebarHeader>
          <h2 className="text-xl font-semibold">Inset Sidebar</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Dashboard">
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Users">
                <Users />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <h2 className="text-lg font-semibold">Main Content Area</h2>
          <p className="mt-2 text-muted-foreground">This is the main content area that works with the inset sidebar variant.</p>
        </div>
      </SidebarInset>
    </>
  ),
  decorators: [
    (Story) => (
      <div className="h-[600px] border rounded-md overflow-hidden">
        <div className="flex h-full">
          <Story />
        </div>
      </div>
    ),
  ],
}; 