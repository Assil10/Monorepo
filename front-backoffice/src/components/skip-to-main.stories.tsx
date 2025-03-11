import type { Meta, StoryObj } from '@storybook/react';
import SkipToMain from './skip-to-main';

const meta = {
  title: 'Components/SkipToMain',
  component: SkipToMain,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkipToMain>;

export default meta;
type Story = StoryObj<typeof SkipToMain>;

export const Default: Story = {
  render: () => (
    <div className="min-h-[600px] p-4 w-full max-w-[800px]">
      <div className="mb-4 text-sm text-muted-foreground">
        <p>The Skip to Main link is hidden by default and appears when focused. Press Tab to focus it.</p>
      </div>
      <SkipToMain />
      <header className="w-full h-16 mb-4 bg-muted/50 rounded-md flex items-center px-4">
        <h1 className="font-medium">Page Header (Tab through here)</h1>
      </header>
      <main id="content" className="w-full border rounded-md p-4">
        <h2 className="text-lg font-medium mb-4">Main Content</h2>
        <p className="text-muted-foreground">
          The SkipToMain component provides an accessibility feature that allows keyboard users to skip navigation
          and go directly to the main content. This is especially helpful for users who navigate with a keyboard 
          or screen reader, as they don't have to tab through all navigation items to reach the main content.
        </p>
        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <p className="text-sm font-medium">Focus lands here when Skip to Main is clicked</p>
        </div>
      </main>
    </div>
  ),
};

export const WithNavigationExample: Story = {
  render: () => (
    <div className="min-h-[600px] p-4 w-full max-w-[800px]">
      <div className="mb-4 text-sm text-muted-foreground">
        <p>Press Tab to focus on the Skip to Main link.</p>
      </div>
      <SkipToMain />
      <header className="w-full mb-4 bg-muted/50 rounded-md p-4">
        <h1 className="font-medium mb-4">Page Header</h1>
        <nav className="flex gap-2 mb-4">
          {['Home', 'Products', 'Services', 'About', 'Contact', 'Blog', 'Resources', 'Help'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="px-3 py-2 rounded hover:bg-muted"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
      <main id="content" className="w-full border rounded-md p-4">
        <h2 className="text-lg font-medium mb-4">Main Content</h2>
        <p className="text-muted-foreground mb-4">
          The SkipToMain component allows users to bypass multiple navigation links and jump directly to the main content.
          This is particularly useful when a page has many navigation items that would require multiple tab presses to navigate through.
        </p>
        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <p className="text-sm font-medium">Focus lands here when Skip to Main is clicked</p>
        </div>
      </main>
    </div>
  ),
}; 