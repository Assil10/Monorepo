import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from './collapsible';
import { Button } from './button';
import { CaretSortIcon, PlusIcon, Cross2Icon } from '@radix-ui/react-icons';

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <div className="flex items-center justify-between space-x-4 rounded-md border px-4 py-3">
        <h4 className="text-sm font-semibold">
          @radix-ui/react-collapsible
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="rounded-md border border-t-0 px-4 py-3 font-normal">
        <p className="text-sm">
          The React component for creating collapsible sections with a button and expandable content panel.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const ControlledWithState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 rounded-t-md border px-4 py-3">
          <h4 className="text-sm font-semibold">Controlled Collapsible</h4>
          <div className="flex items-center space-x-2">
            {isOpen && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => {
                  // Additional action when open
                  console.log("Action triggered");
                }}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? (
                  <Cross2Icon className="h-4 w-4" />
                ) : (
                  <CaretSortIcon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="rounded-b-md border border-t-0 px-4 py-3 font-normal">
          <div className="space-y-2">
            <p className="text-sm">
              This is a controlled collapsible using React state. It can be useful for more complex use cases.
            </p>
            <p className="text-sm text-muted-foreground">
              Current state: {isOpen ? "Open" : "Closed"}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[450px] space-y-4">
      <h3 className="text-lg font-medium mb-5">Frequently Asked Questions</h3>
      
      <Collapsible className="border rounded-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-medium">What is React?</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-4 pb-3 pt-1 text-sm">
          React is a JavaScript library for building user interfaces. It allows you to compose complex UIs from small, isolated pieces of code called "components".
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="border rounded-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-medium">What is Radix UI?</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-4 pb-3 pt-1 text-sm">
          Radix UI is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible className="border rounded-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h4 className="text-sm font-medium">What is Tailwind CSS?</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="px-4 pb-3 pt-1 text-sm">
          Tailwind CSS is a utility-first CSS framework that can be composed to build any design, directly in your markup. It provides low-level utility classes that let you build completely custom designs.
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const NestedCollapsibles: Story = {
  render: () => (
    <Collapsible className="w-[350px] border rounded-md">
      <div className="flex items-center justify-between px-4 py-3">
        <h4 className="text-sm font-medium">Project Structure</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-4 pb-3">
        <div className="ml-4 border-l pl-2 text-sm">
          <div className="py-1">📁 src</div>
          
          <Collapsible className="ml-4">
            <div className="flex items-center py-1">
              <CollapsibleTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0 mr-1">
                  <CaretSortIcon className="h-3 w-3" />
                </Button>
              </CollapsibleTrigger>
              <span>📁 components</span>
            </div>
            <CollapsibleContent className="ml-4 border-l pl-2">
              <div className="py-1">📄 button.tsx</div>
              <div className="py-1">📄 card.tsx</div>
              <div className="py-1">📄 collapsible.tsx</div>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="ml-4">
            <div className="flex items-center py-1">
              <CollapsibleTrigger asChild>
                <Button variant="link" size="sm" className="h-auto p-0 mr-1">
                  <CaretSortIcon className="h-3 w-3" />
                </Button>
              </CollapsibleTrigger>
              <span>📁 pages</span>
            </div>
            <CollapsibleContent className="ml-4 border-l pl-2">
              <div className="py-1">📄 index.tsx</div>
              <div className="py-1">📄 about.tsx</div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="py-1">📄 App.tsx</div>
          <div className="py-1">📄 main.tsx</div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}; 