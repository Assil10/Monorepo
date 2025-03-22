import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';
import React from 'react';
import { PinInput, PinInputField } from './pin-input';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['numeric', 'alphanumeric'],
      description: 'The type of characters allowed in the PIN',
    },
    mask: {
      control: 'boolean',
      description: 'Whether to mask the PIN (like a password)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the PIN input is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the PIN input is read-only',
    },
    otp: {
      control: 'boolean',
      description: 'Whether to use autocomplete="one-time-code"',
    },
  },
  args: {
    // Add explicit spies for action props
    onChange: fn(),
    onComplete: fn(),
    onIncomplete: fn(),
  },
} satisfies Meta<typeof PinInput>;

export default meta;
type Story = StoryObj<typeof PinInput>;

// Basic 4-digit PIN input
export const Default: Story = {
  args: {
    type: 'numeric',
    mask: false,
    otp: false,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();
    
    const handleChange = (newValue: string) => {
      args.onChange(newValue);
      updateArgs({ value: newValue });
    };
    
    const handleComplete = (value: string) => {
      args.onComplete(value);
      toast({
        title: 'PIN Complete',
        description: `PIN value: ${value}`,
      });
    };
    
    return (
      <div className="p-6 bg-card rounded-md shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Enter your 4-digit PIN</h3>
        <PinInput 
          value={value}
          onChange={handleChange}
          onComplete={handleComplete}
          {...args}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </div>
    );
  },
};

// 6-digit numeric PIN
export const SixDigit: Story = {
  args: {
    type: 'numeric',
    mask: false,
    otp: true,
  },
  render: (args) => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Enter your 6-digit OTP</h3>
      <PinInput {...args}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </div>
  ),
};

// Masked PIN (for passwords)
export const Masked: Story = {
  args: {
    type: 'alphanumeric',
    mask: true,
  },
  render: (args) => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Enter your secure PIN</h3>
      <PinInput {...args}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </div>
  ),
};

// Alphanumeric PIN
export const Alphanumeric: Story = {
  args: {
    type: 'alphanumeric',
    mask: false,
  },
  render: (args) => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Enter your alphanumeric code</h3>
      <PinInput {...args}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  args: {
    type: 'numeric',
    disabled: true,
    defaultValue: '1234',
  },
  render: (args) => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Disabled PIN input</h3>
      <PinInput {...args}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </div>
  ),
};

// Read-only state
export const ReadOnly: Story = {
  args: {
    type: 'numeric',
    readOnly: true,
    defaultValue: '5678',
  },
  render: (args) => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Read-only PIN input</h3>
      <PinInput {...args}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </div>
  ),
};

// With validation and form submission
export const WithValidation: Story = {
  render: () => {
    const [pin, setPin] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [error, setError] = React.useState('');
    
    const handlePinChange = (value: string) => {
      setPin(value);
      setError('');
    };
    
    const handleSubmit = () => {
      setIsSubmitting(true);
      
      // Simulate API validation
      setTimeout(() => {
        if (pin !== '1234') {
          setError('Invalid PIN. Try 1234.');
        } else {
          toast({
            title: 'Success!',
            description: 'PIN verified successfully',
          });
        }
        setIsSubmitting(false);
      }, 1000);
    };
    
    return (
      <div className="p-6 bg-card rounded-md shadow-sm w-[350px]">
        <h3 className="mb-4 text-lg font-medium">Verify your PIN</h3>
        <p className="text-sm text-muted-foreground mb-4">Enter PIN: 1234 to succeed</p>
        
        <PinInput
          value={pin}
          onChange={handlePinChange}
          type="numeric"
          className="mb-2"
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
        
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        
        <Button 
          className="w-full mt-4" 
          onClick={handleSubmit}
          disabled={pin.length !== 4 || isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify PIN'}
        </Button>
      </div>
    );
  },
};

// With custom styling
export const WithCustomStyling: Story = {
  render: () => (
    <div className="p-6 bg-card rounded-md shadow-sm">
      <h3 className="mb-4 text-lg font-medium">Styled PIN input</h3>
      <PinInput className="gap-3">
        <PinInputField className="h-12 w-12 text-xl font-bold rounded-full bg-primary/10 text-primary border-primary" />
        <PinInputField className="h-12 w-12 text-xl font-bold rounded-full bg-primary/10 text-primary border-primary" />
        <PinInputField className="h-12 w-12 text-xl font-bold rounded-full bg-primary/10 text-primary border-primary" />
        <PinInputField className="h-12 w-12 text-xl font-bold rounded-full bg-primary/10 text-primary border-primary" />
      </PinInput>
    </div>
  ),
}; 