import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from './password-input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
    className: 'w-[300px]',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="password">Password</Label>
      <PasswordInput id="password" {...args} />
    </div>
  ),
  args: {
    placeholder: 'Enter your password',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter password',
    disabled: true,
    className: 'w-[300px]',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'password123',
    className: 'w-[300px]',
  },
};

export const PasswordWithRequirements: Story = {
  render: (args) => {
    const [passwordRequirements, setPasswordRequirements] = useState({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value;
      setPasswordRequirements({
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
      });
    };
    
    return (
      <div className="grid w-full max-w-sm gap-3">
        <Label htmlFor="secure-password">Create a secure password</Label>
        <PasswordInput 
          id="secure-password"
          placeholder="Enter a strong password"
          onChange={handleChange}
          {...args}
        />
        <div className="space-y-1 text-xs text-muted-foreground">
          <p className="font-medium text-sm">Password requirements:</p>
          <ul className="list-disc list-inside">
            <li className={passwordRequirements.length ? "text-green-500" : ""}>
              At least 8 characters
            </li>
            <li className={passwordRequirements.uppercase ? "text-green-500" : ""}>
              At least one uppercase letter
            </li>
            <li className={passwordRequirements.lowercase ? "text-green-500" : ""}>
              At least one lowercase letter
            </li>
            <li className={passwordRequirements.number ? "text-green-500" : ""}>
              At least one number
            </li>
            <li className={passwordRequirements.special ? "text-green-500" : ""}>
              At least one special character
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

export const PasswordConfirmation: Story = {
  render: (args) => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [match, setMatch] = useState<boolean | null>(null);
    
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (confirm) {
        setMatch(e.target.value === confirm);
      } else {
        setMatch(null);
      }
    };
    
    const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirm(e.target.value);
      if (e.target.value) {
        setMatch(password === e.target.value);
      } else {
        setMatch(null);
      }
    };
    
    return (
      <div className="grid w-full max-w-sm gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="new-password">New Password</Label>
          <PasswordInput 
            id="new-password" 
            placeholder="Enter new password"
            onChange={handlePasswordChange}
            {...args}
          />
        </div>
        
        <div className="grid gap-1.5">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <PasswordInput 
            id="confirm-password" 
            placeholder="Confirm new password"
            onChange={handleConfirmChange}
            className={match === false ? "border-red-500" : ""}
            {...args}
          />
          {match === false && (
            <p className="text-xs text-red-500">Passwords do not match</p>
          )}
          {match === true && (
            <p className="text-xs text-green-500">Passwords match</p>
          )}
        </div>
        
        <Button 
          className="mt-2" 
          disabled={!password || !confirm || !match}
        >
          Update Password
        </Button>
      </div>
    );
  },
}; 