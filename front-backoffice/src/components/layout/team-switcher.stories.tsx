import type { Meta, StoryObj } from '@storybook/react';
import { TeamSwitcher } from './team-switcher';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Command, GalleryVerticalEnd, AudioWaveform, GitBranch, Codesandbox, Database } from 'lucide-react';

const meta = {
  title: 'Layout/TeamSwitcher',
  component: TeamSwitcher,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] w-[300px] border rounded-md overflow-hidden">
        <SidebarProvider defaultOpen={true}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof TeamSwitcher>;

export default meta;
type Story = StoryObj<typeof TeamSwitcher>;

export const Default: Story = {
  args: {
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
      {
        name: 'Widgets Co',
        logo: GalleryVerticalEnd,
        plan: 'Business',
      },
      {
        name: 'DevCorp',
        logo: AudioWaveform,
        plan: 'Startup',
      },
    ]
  }
};

export const SingleTeam: Story = {
  args: {
    teams: [
      {
        name: 'Personal Workspace',
        logo: Command,
        plan: 'Free',
      }
    ]
  }
};

export const ManyTeams: Story = {
  args: {
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
      {
        name: 'Widgets Co',
        logo: GalleryVerticalEnd,
        plan: 'Business',
      },
      {
        name: 'DevCorp',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'TechGurus',
        logo: GitBranch,
        plan: 'Enterprise',
      },
      {
        name: 'CloudNative',
        logo: Codesandbox,
        plan: 'Business',
      },
      {
        name: 'DataDriven',
        logo: Database,
        plan: 'Enterprise',
      }
    ]
  }
};

export const LongNames: Story = {
  args: {
    teams: [
      {
        name: 'Acme Incorporated International',
        logo: Command,
        plan: 'Enterprise Plus Premium Edition',
      },
      {
        name: 'Super Long Organization Name That Will Truncate',
        logo: GalleryVerticalEnd,
        plan: 'Business Plus',
      }
    ]
  }
};

export const CollapsedSidebar: Story = {
  args: {
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
      {
        name: 'Widgets Co',
        logo: GalleryVerticalEnd,
        plan: 'Business',
      },
      {
        name: 'DevCorp',
        logo: AudioWaveform,
        plan: 'Startup',
      },
    ]
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] border rounded-md overflow-hidden">
        <SidebarProvider defaultOpen={false}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
}; 