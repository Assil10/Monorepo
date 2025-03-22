import type { Meta, StoryObj } from '@storybook/react';
import { NavGroup } from './nav-group';
import { SidebarProvider } from '@/components/ui/sidebar';
import {
  IconHome,
  IconUsers,
  IconSettings,
  IconDashboard,
  IconLock,
  IconHelp,
  IconBellRinging,
} from '@tabler/icons-react';

const meta = {
  title: 'Layout/NavGroup',
  component: NavGroup,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] border rounded-md overflow-hidden flex">
        <SidebarProvider defaultOpen={true}>
          <div className="w-[250px] border-r">
            <Story />
          </div>
          <div className="flex-1 p-4 bg-muted/20">
            <div className="p-4 h-full border rounded-md bg-background">
              <h2 className="text-lg font-semibold">Main Content Area</h2>
              <p className="text-muted-foreground mt-2">
                Select an item from the navigation group to see how it works.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof NavGroup>;

export default meta;
type Story = StoryObj<typeof NavGroup>;

export const SimpleLinks: Story = {
  args: {
    title: "Main Navigation",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard
      },
      {
        title: "Users",
        url: "/users",
        icon: IconUsers
      },
      {
        title: "Settings",
        url: "/settings",
        icon: IconSettings
      }
    ]
  }
};

export const WithBadges: Story = {
  args: {
    title: "Features",
    items: [
      {
        title: "Home",
        url: "/",
        icon: IconHome
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: IconBellRinging,
        badge: "5"
      },
      {
        title: "Settings",
        url: "/settings",
        icon: IconSettings,
        badge: "New"
      }
    ]
  }
};

export const WithNestedItems: Story = {
  args: {
    title: "Administration",
    items: [
      {
        title: "User Management",
        icon: IconUsers,
        items: [
          {
            title: "All Users",
            url: "/users",
            icon: IconUsers
          },
          {
            title: "Add User",
            url: "/users/add"
          },
          {
            title: "User Groups",
            url: "/users/groups"
          }
        ]
      },
      {
        title: "Security",
        icon: IconLock,
        items: [
          {
            title: "Permissions",
            url: "/security/permissions"
          },
          {
            title: "Roles",
            url: "/security/roles"
          },
          {
            title: "Audit Log",
            url: "/security/audit",
            badge: "Updated"
          }
        ]
      },
      {
        title: "Help",
        url: "/help",
        icon: IconHelp
      }
    ]
  }
};

export const CollapsedSidebar: Story = {
  args: {
    title: "Main Menu",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard
      },
      {
        title: "User Management",
        icon: IconUsers,
        items: [
          {
            title: "All Users",
            url: "/users"
          },
          {
            title: "Add User",
            url: "/users/add"
          }
        ]
      },
      {
        title: "Settings",
        icon: IconSettings,
        items: [
          {
            title: "General",
            url: "/settings/general"
          },
          {
            title: "Security",
            url: "/settings/security"
          }
        ]
      }
    ]
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] border rounded-md overflow-hidden flex">
        <SidebarProvider defaultOpen={false}>
          <div className="border-r">
            <Story />
          </div>
          <div className="flex-1 p-4 bg-muted/20">
            <div className="p-4 h-full border rounded-md bg-background">
              <h2 className="text-lg font-semibold">Main Content Area</h2>
              <p className="text-muted-foreground mt-2">
                The sidebar is collapsed. Hover over an icon to see the dropdown menu for items with children.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
}; 