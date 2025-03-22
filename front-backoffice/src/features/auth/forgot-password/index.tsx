import { Link } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { ForgotForm } from './components/forgot-password-form'

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <Card className='w-full max-w-md p-6'>
        <div className='mb-4 flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Reset your password
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email address and we'll send you instructions to reset
            your password.
          </p>
        </div>
        <ForgotForm />
        <div className='mt-6 text-center'>
          <Link to='/sign-in' className='text-sm text-primary hover:underline'>
            Back to Sign In
          </Link>
        </div>
      </Card>
    </AuthLayout>
  )
}
