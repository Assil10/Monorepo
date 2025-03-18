import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PinInput, PinInputField } from '@/components/pin-input'

type ResetPasswordOtpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  otp: z
    .string()
    .min(6, {
      message: 'Please enter the complete 6-digit verification code.',
    }),
})

export function ResetPasswordOtpForm({
  className,
  ...props
}: ResetPasswordOtpFormProps) {
  const search = useSearch({ from: '/(auth)/otp' })
  const email = search.email as string
  const [disabledBtn, setDisabledBtn] = useState(true)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (!email) {
      return
    }

    // Navigate to the reset password page with the email and code
    navigate({
      to: '/reset-password',
      search: {
        email: email,
        code: data.otp,
      },
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            {!email && (
              <p className='mb-2 text-sm text-destructive'>
                No email provided. Please go back and try again.
              </p>
            )}
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl>
                    <PinInput
                      {...field}
                      className='flex h-10 justify-between'
                      onComplete={() => setDisabledBtn(false)}
                      onIncomplete={() => setDisabledBtn(true)}
                    >
                      {Array.from({ length: 6 }, (_, i) => (
                        <PinInputField
                          key={i}
                          component={Input}
                          className={`${form.getFieldState('otp').invalid ? 'border-red-500' : ''} w-14`}
                        />
                      ))}
                    </PinInput>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={disabledBtn || !email}>
              Verify Code
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
