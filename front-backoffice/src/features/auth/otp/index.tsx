import { Link, useSearch } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { OtpForm } from './components/otp-form'
import { ResetPasswordOtpForm } from './components/reset-password-otp-form'

export default function Otp() {
  const search = useSearch({ from: '/(auth)/otp' })
  const email = (search.email as string) || 'your email'
  const isPasswordReset = search.type === 'reset-password'

  return (
    <AuthLayout>
      <Card className='w-full max-w-md p-6'>
        <div className='mb-4 flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {isPasswordReset ? 'Reset Password' : 'Email Verification'}
          </h1>
          <p className='text-sm text-muted-foreground'>
            Please enter the verification code. <br />
            We have sent the code to{' '}
            <span className='font-medium'>{email}</span>.
          </p>
        </div>
        {isPasswordReset ? <ResetPasswordOtpForm /> : <OtpForm />}
        <p className='mt-6 text-center text-sm text-muted-foreground'>
          Haven't received it?{' '}
          <Link
            to={isPasswordReset ? '/forgot-password' : '/sign-in'}
            className='underline underline-offset-4 hover:text-primary'
          >
            Resend a new code
          </Link>
        </p>
      </Card>
    </AuthLayout>
  )
}
