import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';
import { Card, CardContent, CardFooter, CardHeader } from './card';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'h-[20px] w-[200px]',
  },
};

export const Circle: Story = {
  args: {
    className: 'h-12 w-12 rounded-full',
  },
};

export const Rectangle: Story = {
  args: {
    className: 'h-32 w-48 rounded-md',
  },
};

export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-[350px] border rounded-lg p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[90%]" />
      </CardContent>
      <CardFooter className="gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
      </CardFooter>
    </Card>
  ),
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="w-[350px] space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-10 w-[120px]" />
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="border rounded-md">
        <div className="flex border-b h-12">
          <Skeleton className="w-[50px] h-full rounded-none" />
          <Skeleton className="w-[200px] h-full rounded-none" />
          <Skeleton className="w-[150px] h-full rounded-none" />
          <Skeleton className="w-[200px] h-full rounded-none" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex border-b last:border-0 h-16">
            <Skeleton className="w-[50px] h-full rounded-none" />
            <Skeleton className="w-[200px] h-full rounded-none" />
            <Skeleton className="w-[150px] h-full rounded-none" />
            <Skeleton className="w-[200px] h-full rounded-none" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-[120px]" />
      </div>
    </div>
  ),
}; 