import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useSignIn, useSignUp } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

// Password validation schema
const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// Main form schema
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'First name is required' })
      .max(50, { message: 'First name must be less than 50 characters' }),
    surname: z
      .string()
      .min(1, { message: 'Last name is required' })
      .max(50, { message: 'Last name must be less than 50 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
    birthdate: z
      .string()
      .min(1, { message: 'Birthdate is required' })
      .refine(
        (date) => {
          const today = new Date()
          const birthDate = new Date(date)
          let age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--
          }
          return age >= 18
        },
        { message: 'You must be at least 18 years old to register' }
      ),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const signUp = useSignUp()
  const { signInWithGoogle } = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { confirmPassword, ...signUpData } = data
    signUp.mutate(signUpData)
  }

  const handleGoogleSignUp = () => {
    signInWithGoogle.mutate()
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John'
                        {...field}
                        disabled={
                          signUp.isPending || signInWithGoogle.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='surname'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Doe'
                        {...field}
                        disabled={
                          signUp.isPending || signInWithGoogle.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='name@example.com'
                      type='email'
                      {...field}
                      disabled={signUp.isPending || signInWithGoogle.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='birthdate'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type='date'
                      {...field}
                      disabled={signUp.isPending || signInWithGoogle.isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    You must be at least 18 years old to register
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      {...field}
                      disabled={signUp.isPending || signInWithGoogle.isPending}
                      showStrengthIndicator={true}
                    />
                  </FormControl>
                  <FormDescription>
                    At least 8 characters with uppercase, lowercase and numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      {...field}
                      disabled={signUp.isPending || signInWithGoogle.isPending}
                      showStrengthIndicator={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              disabled={signUp.isPending || signInWithGoogle.isPending}
              onClick={() => {
                if (!form.formState.isValid) {
                  form.trigger() // Trigger validation to show all errors
                }
              }}
            >
              {signUp.isPending ? 'Creating Account...' : 'Create Account'}
            </Button>

            {Object.keys(form.formState.errors).length > 0 &&
              form.formState.submitCount > 0 && (
                <div className='mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive'>
                  <p className='mb-1 font-medium'>
                    Please fix the following issues:
                  </p>
                  <ul className='list-disc pl-5'>
                    {Object.entries(form.formState.errors).map(
                      ([field, error]) => (
                        <li key={field}>{error?.message as string}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

            <p className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link to='/sign-in' className='text-primary hover:underline'>
                Sign in
              </Link>
            </p>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={signUp.isPending || signInWithGoogle.isPending}
                onClick={handleGoogleSignUp}
              >
                <IconBrandGoogle className='mr-2 h-4 w-4' />
                {signInWithGoogle.isPending ? 'Connecting...' : 'Google'}
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={signUp.isPending || signInWithGoogle.isPending}
              >
                <IconBrandFacebook className='mr-2 h-4 w-4' />
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>

      {signUp.isError && (
        <div className='mt-2 rounded-md border border-destructive/50 bg-destructive/10 p-2 text-sm text-destructive'>
          <p className='font-medium'>Registration failed</p>
          <p>
            {signUp.error?.response?.data?.message ||
              'An error occurred during sign up'}
          </p>
        </div>
      )}
    </div>
  )
}
