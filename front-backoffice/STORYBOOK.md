# Storybook for Front Backoffice

This project uses [Storybook](https://storybook.js.org/) to document and showcase UI components. Storybook provides a way to develop, design, and test UI components in isolation.

## Getting Started

To run Storybook locally:

```bash
cd front-backoffice
npm run storybook
```

This will start Storybook on port 6006. Open [http://localhost:6006](http://localhost:6006) to view it in your browser.

## Project Structure

Storybook stories are located alongside their respective components with the naming convention `*.stories.tsx`. 

For example:
- `src/components/ui/button.tsx` - Component file
- `src/components/ui/button.stories.tsx` - Corresponding Storybook story

## Adding New Stories

### Basic Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './your-component';

// Component metadata
const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'], // Enable automatic documentation generation
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create stories
export const Default: Story = {
  args: {
    // Component props
  },
};

export const Variant: Story = {
  render: () => <YourComponent prop="value" />,
};
```

### Using Controls

You can define controls for your component props in the `argTypes` object:

```tsx
const meta = {
  // ...
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'blue', 'green'],
      description: 'The color of the component',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component',
    },
  },
} satisfies Meta<typeof YourComponent>;
```

## Theme Support

Stories render with the theme set in the Storybook toolbar. Use the theme toggle to switch between light and dark mode to test your components in both themes.

## Special Components

Some components require special handling due to dependencies on context providers or routing:

1. **Router-dependent components** use the `ReactRouterDecorator` from `src/lib/storybook-decorators.tsx`
2. **Theme-dependent components** use the global theme provider in Storybook's preview configuration

## Best Practices

1. **Keep stories simple**: Each story should showcase a specific state or feature of the component
2. **Use args when possible**: This makes it easier to control the component through Storybook's controls
3. **Write descriptions**: Help other developers understand your component's purpose and how to use it
4. **Test edge cases**: Include stories for loading states, error states, and other edge cases
5. **Include accessibility tests**: Use Storybook's a11y addon to ensure your components are accessible

## Building Storybook for Deployment

To build Storybook as a static site:

```bash
npm run build-storybook
```

This will create a `storybook-static` directory with the built Storybook, which can be deployed to any static hosting service. 