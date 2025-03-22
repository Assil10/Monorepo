import type { Meta, StoryObj } from '@storybook/react';
import LongText from './long-text';

const meta = {
  title: 'Components/LongText',
  component: LongText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LongText>;

export default meta;
type Story = StoryObj<typeof LongText>;

const shortText = "This is a short text that won't overflow.";
const mediumText = "This is a medium length text that might overflow depending on the container width. Hover to see the full text.";
const longText = "This is a very long text that will definitely overflow in most container widths. It contains a lot of information that wouldn't fit in a small space and requires the tooltip or popover to be displayed fully. When the user hovers over this text, they'll see the full content in a tooltip on desktop or in a popover on mobile devices.";
const veryLongWithBreaks = "This is an extremely long text with some technical terms like 'supercalifragilisticexpialidocious' and URLs like https://very-long-domain-name-example.com/path/to/some/resource?query=parameter&another=value that will definitely cause overflow. It also contains multiple sentences and paragraphs.\n\nThis is a new paragraph within the long text that helps demonstrate how multiline content is displayed in the tooltip or popover.";

export const Short: Story = {
  args: {
    children: shortText,
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Medium: Story = {
  args: {
    children: mediumText,
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Long: Story = {
  args: {
    children: longText,
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const VeryLongWithBreaks: Story = {
  args: {
    children: veryLongWithBreaks,
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCustomClasses: Story = {
  args: {
    children: longText,
    className: 'text-primary font-medium',
    contentClassName: 'bg-secondary/20 text-secondary-foreground',
  },
  decorators: [
    (Story) => (
      <div className="p-4 border rounded-md" style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const InTableCell: Story = {
  args: {
    children: longText,
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] p-4 border rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left w-1/4 p-2 border-b">ID</th>
              <th className="text-left w-1/4 p-2 border-b">Name</th>
              <th className="text-left w-1/2 p-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b">001</td>
              <td className="p-2 border-b">Product Name</td>
              <td className="p-2 border-b">
                <Story />
              </td>
            </tr>
            <tr>
              <td className="p-2 border-b">002</td>
              <td className="p-2 border-b">Another Product</td>
              <td className="p-2 border-b">Short description</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  ],
};

export const WithDifferentWidths: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Width: 500px</p>
        <div className="p-4 border rounded-md" style={{ width: '500px' }}>
          <LongText>{longText}</LongText>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Width: 300px</p>
        <div className="p-4 border rounded-md" style={{ width: '300px' }}>
          <LongText>{longText}</LongText>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Width: 200px</p>
        <div className="p-4 border rounded-md" style={{ width: '200px' }}>
          <LongText>{longText}</LongText>
        </div>
      </div>
    </div>
  ),
}; 