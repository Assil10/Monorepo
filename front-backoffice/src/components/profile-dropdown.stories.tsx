import type { Meta, StoryObj } from '@storybook/react';
import { ProfileDropdown } from './profile-dropdown';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouterDecorator } from '../lib/storybook-decorators';

// Need to create a mock for TanStack Router
const meta = {
  title: 'Components/ProfileDropdown',
  component: ProfileDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [ReactRouterDecorator],
} satisfies Meta<typeof ProfileDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ProfileDropdown />,
}; 