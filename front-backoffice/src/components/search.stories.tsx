import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './search';
import { SearchProvider } from '@/context/search-context';
import { Decorator } from '@storybook/react';

// Create a search provider decorator
const SearchContextDecorator: Decorator = (Story) => (
  <SearchProvider>
    <div className="flex items-center justify-center p-8">
      <Story />
    </div>
  </SearchProvider>
);

const meta = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [SearchContextDecorator],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: () => <Search />,
};

export const WithCustomPlaceholder: Story = {
  render: () => <Search placeholder="Find products..." />,
};

export const WithCustomWidth: Story = {
  render: () => <Search className="w-96" />,
};

export const InNavbar: Story = {
  render: () => (
    <div className="w-full bg-card p-4 rounded-md shadow">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="flex items-center gap-4">
          <Search />
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            U
          </div>
        </div>
      </div>
    </div>
  ),
}; 