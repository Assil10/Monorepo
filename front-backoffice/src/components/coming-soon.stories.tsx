import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ComingSoon from './coming-soon';
import { IconPlanet, IconRocket, IconTools } from '@tabler/icons-react';

const meta = {
  title: 'Components/ComingSoon',
  component: ComingSoon,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComingSoon>;

export default meta;
type Story = StoryObj<typeof ComingSoon>;

export const Default: Story = {
  render: () => <ComingSoon />,
};

// Custom version with different icon and text
const CustomComingSoon = ({ 
  icon: Icon = IconRocket, 
  title = "Launching Soon", 
  description = "We're working hard to launch this feature. Check back later!"
}) => {
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <Icon size={72} />
        <h1 className='text-4xl font-bold leading-tight'>{title}</h1>
        <p className='text-center text-muted-foreground'>{description}</p>
      </div>
    </div>
  );
};

export const WithRocketIcon: Story = {
  render: () => <CustomComingSoon />,
};

export const UnderConstruction: Story = {
  render: () => (
    <CustomComingSoon 
      icon={IconTools}
      title="Under Construction"
      description="We're building something awesome. Please be patient while we put the finishing touches on this page."
    />
  ),
};

export const InCard: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="max-w-md p-8 border rounded-lg shadow-sm bg-card">
      <div className='flex flex-col items-center justify-center gap-4 py-8'>
        <IconRocket size={64} className="text-primary" />
        <h2 className='text-2xl font-bold'>Feature Coming Soon</h2>
        <p className='text-center text-muted-foreground'>
          This feature is currently in development and will be available in the next update.
        </p>
        <div className="mt-4 p-2 bg-primary/10 text-primary rounded text-sm">
          Estimated arrival: Q3 2023
        </div>
      </div>
    </div>
  ),
}; 