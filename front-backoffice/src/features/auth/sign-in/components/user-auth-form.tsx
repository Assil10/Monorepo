import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UseMutationResult } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { IconBrandGoogle, IconBrandFacebook } from '@tabler/icons-react'
import { IconAlertCircle } from '@tabler/icons-react'
import {
  SignInRequest,
  SignInResponse,
  AuthError,
} from '@/api/services/auth-service'
import { cn } from '@/lib/utils'
import { useSignIn } from '@/hooks/use-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
  rememberMe: z.boolean().default(false),
})

type SignInHookReturn = {
  signIn: UseMutationResult<SignInResponse, AuthError, SignInRequest>
  signInWithGoogle: UseMutationResult<SignInResponse, AuthError, void>
  failedAttempts: number
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { signIn, signInWithGoogle, failedAttempts } =
    useSignIn() as SignInHookReturn

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    signIn.mutate({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    })
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle.mutate()
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            {failedAttempts >= 2 && (
              <Alert variant='destructive' className='mb-4'>
                <IconAlertCircle className='h-4 w-4' />
                <AlertTitle>Multiple failed attempts detected</AlertTitle>
                <AlertDescription>
                  {failedAttempts >= 4
                    ? 'Your account will be temporarily locked after the next failed attempt. Consider resetting your password.'
                    : "Please make sure you're using the correct email and password."}
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='name@example.com'
                      {...field}
                      autoComplete='email'
                      disabled={signIn.isPending || signInWithGoogle.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      placeholder='********'
                      {...field}
                      autoComplete='current-password'
                      showStrengthIndicator={false}
                      disabled={signIn.isPending || signInWithGoogle.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rememberMe'
              render={({ field }) => (
                <FormItem className='mt-2 flex flex-row items-center space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={signIn.isPending || signInWithGoogle.isPending}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Remember me</FormLabel>
                    <FormDescription>
                      Stay signed in for 30 days
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button
              className='mt-4'
              disabled={signIn.isPending || signInWithGoogle.isPending}
            >
              {signIn.isPending ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className='relative my-4'>
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
                disabled={signIn.isPending || signInWithGoogle.isPending}
                onClick={handleGoogleSignIn}
              >
                <IconBrandGoogle className='mr-2 h-4 w-4' />
                {signInWithGoogle.isPending ? 'Connecting...' : 'Google'}
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={signIn.isPending || signInWithGoogle.isPending}
              >
                <IconBrandFacebook className='mr-2 h-4 w-4' />
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
