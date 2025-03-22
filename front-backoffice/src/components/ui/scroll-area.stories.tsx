import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the scrollable area',
    },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-[200px] w-[350px] rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Vertical Scroll Example</h4>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis eros ut velit faucibus, id dapibus nisl 
          porttitor. Sed porttitor, ipsum eu hendrerit venenatis, nibh libero gravida mi, ac tempor neque lacus at nibh.
          Quisque elementum euismod lorem, at convallis lorem euismod ac. Fusce id metus sed leo lacinia placerat.
        </p>
        <div className="h-[20px]" />
        <p className="text-sm">
          Proin faucibus diam ut lacus tincidunt fermentum. Nulla facilisi. Integer faucibus lorem metus, 
          vel finibus augue maximus nec. Nullam convallis libero non ligula molestie, nec lobortis felis 
          interdum. Duis in sapien quis dolor finibus eleifend. Integer sodales, nisl eget convallis 
          porta, neque risus molestie erat, quis scelerisque orci massa in risus.
        </p>
        <div className="h-[20px]" />
        <p className="text-sm">
          Nullam tincidunt, justo eu convallis semper, risus ligula venenatis ipsum, nec pharetra 
          dolor sem et mi. Vestibulum pellentesque, nulla at commodo aliquet, arcu arcu tincidunt 
          felis, ut feugiat neque purus nec erat. Suspendisse gravida, nunc quis sollicitudin lobortis, 
          sapien mi blandit sem, ac porta elit enim id enim.
        </p>
        <div className="h-[20px]" />
        <p className="text-sm">
          Quisque elementum euismod lorem, at convallis lorem euismod ac. Fusce id metus sed leo lacinia placerat.
          Proin faucibus diam ut lacus tincidunt fermentum. Nulla facilisi. Integer faucibus lorem metus, 
          vel finibus augue maximus nec.
        </p>
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    className: 'h-[100px] w-[350px] rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="flex p-4 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i} 
            className="h-[80px] w-[200px] flex-shrink-0 rounded-md border flex items-center justify-center"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithLongContent: Story = {
  args: {
    className: 'h-[350px] w-[400px] rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Terms and Conditions</h4>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="mb-4">
            <h5 className="text-sm font-medium">Section {i + 1}</h5>
            <p className="text-sm text-muted-foreground mt-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis eros ut velit faucibus, 
              id dapibus nisl porttitor. Sed porttitor, ipsum eu hendrerit venenatis, nibh libero gravida mi, 
              ac tempor neque lacus at nibh. Quisque elementum euismod lorem, at convallis lorem euismod ac. 
              Fusce id metus sed leo lacinia placerat.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithCards: Story = {
  args: {
    className: 'h-[400px] w-[400px] rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <h4 className="text-sm font-medium mb-2">Card Title {i + 1}</h4>
            <p className="text-sm text-muted-foreground">
              This is the content for card {i + 1}. Each card has different content.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="text-xs">Status: Active</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const TableExample: Story = {
  args: {
    className: 'h-[300px] w-[600px] rounded-md border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="w-[700px]">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{1000 + i}</td>
                <td className="p-2">User {i + 1}</td>
                <td className="p-2">user{i + 1}@example.com</td>
                <td className="p-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="p-2">Member</td>
                <td className="p-2">
                  <button className="text-xs text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  ),
}; 