import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import '../src/index.css'; // Import global CSS
import { ThemeProvider } from '../src/context/theme-context';
import React, { useEffect } from 'react';

// Create a decorator that provides the theme context
function ThemeWrapper({ children, theme }: { children: React.ReactNode; theme: string }) {
  useEffect(() => {
    // Add the theme class to the html element
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark');
    htmlElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProvider defaultTheme={theme === 'dark' ? 'dark' : 'light'}>
      <div className={`bg-background text-foreground`}>
        {children}
      </div>
    </ThemeProvider>
  );
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      dark: { ...themes.dark },
      light: { ...themes.normal },
      current: 'light',
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#020817',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Get the current theme from the Storybook toolbar
      const theme = context.globals.theme || 'light';
      
      return (
        <ThemeWrapper theme={theme}>
          <div className="p-4">
            <Story />
          </div>
        </ThemeWrapper>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview; 