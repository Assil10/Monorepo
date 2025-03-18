import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { useForgotPassword } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const forgotPassword = useForgotPassword()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    forgotPassword.mutate(data)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
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
                      autoComplete='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2'
              disabled={forgotPassword.isPending || !form.formState.isValid}
            >
              {forgotPassword.isPending
                ? 'Sending...'
                : 'Send Reset Instructions'}
            </Button>
          </div>
        </form>
      </Form>

      {forgotPassword.isSuccess && (
        <div className='mt-2 rounded-md border border-green-200 bg-green-50 p-2 text-sm text-green-600 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400'>
          <p>
            Password reset instructions have been sent to your email. Please
            check your inbox.
          </p>
        </div>
      )}

      {forgotPassword.isError && (
        <div className='mt-2 rounded-md border border-destructive/50 bg-destructive/10 p-2 text-sm text-destructive'>
          <p>
            {forgotPassword.error?.response?.data?.message ||
              'An error occurred. Please try again.'}
          </p>
        </div>
      )}
    </div>
  )
}
