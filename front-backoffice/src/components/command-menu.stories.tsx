import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { CommandMenu } from './command-menu';
import { Button } from '@/components/ui/button';
import { SearchProvider } from '@/context/search-context';
import { ThemeProvider } from '@/context/theme-context';
import { useSearch } from '@/context/search-context';

// Instead of trying to modify the module directly, create a mock wrapper
// This is needed because TanStack Router can't be used directly in Storybook
// and we can't modify read-only properties

// Create a context to provide our mock navigation
const MockNavigationContext = React.createContext({ navigate: fn() });

// Create a mock hook that matches the signature of useNavigate
const useMockNavigate = () => {
  const { navigate } = React.useContext(MockNavigationContext);
  return navigate;
};

// Create a wrapper component that provides the mock context
const MockRouterProvider = ({ children }: { children: React.ReactNode }) => {
  const mockNavigate = (args: any) => {
    console.log('Navigate to:', args);
  };
  
  return (
    <MockNavigationContext.Provider value={{ navigate: mockNavigate }}>
      {children}
    </MockNavigationContext.Provider>
  );
};

// Mock implementation for Storybook
const MockSearchContext = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  
  // Create a value object that matches what useSearch expects to provide
  const value = {
    open,
    setOpen,
    // Include any other properties that might be needed
  };
  
  // Override the context provider with our mock value
  return (
    <SearchProvider defaultValue={value}>
      {children}
    </SearchProvider>
  );
};

// Override the actual component to use our mock hook
// This approach avoids modifying read-only module properties
const MockedCommandMenu = (props: React.ComponentProps<typeof CommandMenu>) => {
  // Inject our mock before rendering the actual component
  // @ts-ignore - Mock for Storybook
  window.__tanstack_router_mock_navigate = useMockNavigate;
  
  return <CommandMenu {...props} />;
};

const meta = {
  title: 'Components/CommandMenu',
  component: MockedCommandMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MockRouterProvider>
        <ThemeProvider defaultTheme="system" storageKey="theme-mode">
          <MockSearchContext>
            <Story />
          </MockSearchContext>
        </ThemeProvider>
      </MockRouterProvider>
    ),
  ],
} satisfies Meta<typeof MockedCommandMenu>;

export default meta;
type Story = StoryObj<typeof MockedCommandMenu>;

// Trigger component to open the command menu
const CommandTrigger = () => {
  const { setOpen } = useSearch();
  
  return (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Command Menu Demo</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Click the button below to open the command menu or press <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-muted rounded">K</kbd>
      </p>
      <Button 
        onClick={() => setOpen(true)}
        className="mb-4"
      >
        Open Command Menu
      </Button>
      <div className="text-xs text-muted-foreground">
        Note: Navigation functionality is limited in Storybook environment.
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <CommandTrigger />
      <MockedCommandMenu />
    </>
  ),
};

// For documentation purposes, provide a screenshot or description
export const Documentation: Story = {
  parameters: {
    docs: {
      description: {
        story: `
The Command Menu provides a keyboard-accessible interface for navigating the application.
It can be activated with Ctrl+K (or Cmd+K on macOS) and provides:

- Navigation options based on the sidebar structure
- Theme switching capabilities
- Quick search functionality

This component relies on several context providers:
- SearchProvider: Manages the open/closed state of the menu
- ThemeProvider: Handles theme switching
- TanStack Router: Handles navigation

In a real application, users can navigate by selecting menu items, which closes the menu and redirects to the chosen route.
        `,
      },
    },
  },
  render: () => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Command Menu Component</h3>
      <p className="mb-4">
        The Command Menu provides keyboard-driven navigation and actions.
      </p>
      <ul className="list-disc pl-5 mb-4 space-y-2 text-sm">
        <li>Press <kbd className="px-2 py-1 bg-muted rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-muted rounded">K</kbd> to open</li>
        <li>Search for pages, commands, or settings</li>
        <li>Navigate with arrow keys and select with Enter</li>
        <li>Change theme directly from the command menu</li>
      </ul>
      <p className="text-xs text-muted-foreground">
        Note: The actual component is displayed when triggered via the Default story.
      </p>
    </div>
  ),
}; 