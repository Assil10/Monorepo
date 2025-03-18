import { forwardRef, useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input, InputProps } from '@/components/ui/input'

export interface PasswordStrength {
  score: number
  feedback: string[]
  color: string
}

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  showStrengthIndicator?: boolean
}

function calculatePasswordStrength(password: string): PasswordStrength {
  const hasLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const requirements = [
    hasLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
  ]
  const score = requirements.filter(Boolean).length

  const feedback = []
  if (!hasLength) feedback.push('At least 8 characters')
  if (!hasUpperCase) feedback.push('At least one uppercase letter')
  if (!hasLowerCase) feedback.push('At least one lowercase letter')
  if (!hasNumbers) feedback.push('At least one number')
  if (!hasSpecialChar) feedback.push('At least one special character')

  const colors = {
    0: 'bg-red-500',
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-yellow-500',
    4: 'bg-green-500',
    5: 'bg-green-600',
  }

  return {
    score,
    feedback,
    color: colors[score as keyof typeof colors],
  }
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator = true, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [strength, setStrength] = useState<PasswordStrength>({
      score: 0,
      feedback: [],
      color: 'bg-red-500',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showStrengthIndicator) {
        setStrength(calculatePasswordStrength(e.target.value))
      }
      onChange?.(e)
    }

    return (
      <div className='space-y-2'>
        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            className={cn('pr-10', className)}
            ref={ref}
            onChange={handleChange}
            {...props}
          />
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <IconEyeOff className='h-4 w-4' />
            ) : (
              <IconEye className='h-4 w-4' />
            )}
          </Button>
        </div>

        {showStrengthIndicator && props.value && (
          <div className='space-y-2'>
            <div className='flex h-1 gap-1'>
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={cn(
                    'h-full w-full rounded-full transition-colors',
                    index <= strength.score ? strength.color : 'bg-muted'
                  )}
                />
              ))}
            </div>
            {strength.feedback.length > 0 && (
              <ul className='space-y-1 text-sm text-muted-foreground'>
                {strength.feedback.map((feedback, index) => (
                  <li key={index} className='flex items-center gap-1'>
                    <div className='h-1 w-1 rounded-full bg-muted-foreground' />
                    {feedback}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
