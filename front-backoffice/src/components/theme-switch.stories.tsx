import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitch } from './theme-switch';
import { ThemeProvider } from '@/context/theme-context';
import { Decorator } from '@storybook/react';

// Create a theme provider decorator
const ThemeDecorator: Decorator = (Story) => (
  <ThemeProvider defaultTheme="light">
    <div className="flex items-center justify-center p-8 bg-background text-foreground rounded">
      <Story />
    </div>
  </ThemeProvider>
);

const meta = {
  title: 'Components/ThemeSwitch',
  component: ThemeSwitch,
  parameters: {
    layout: 'centered',
    backgrounds: { 
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#020817' },
      ]
    },
  },
  tags: ['autodocs'],
  decorators: [ThemeDecorator],
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ThemeSwitch />,
};

// Helper component to demonstrate the ThemeSwitch in a more realistic context
function ThemeSwitchDemo() {
  return (
    <div className="transition-colors duration-300 min-h-32 min-w-64 p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Theme Switcher Demo</h3>
        <ThemeSwitch />
      </div>
      <p className="text-sm">
        Try switching the theme using the dropdown menu above. The background and text colors will change.
      </p>
    </div>
  );
}

export const InContext: Story = {
  render: () => <ThemeSwitchDemo />,
}; 