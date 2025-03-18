import { Link, useSearch } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { NewPasswordForm } from './components/new-password-form'

export default function ResetPassword() {
  const search = useSearch({ from: '/(auth)/reset-password' })
  const email = (search.email as string) || 'your email'

  return (
    <AuthLayout>
      <Card className='w-full max-w-md p-6'>
        <div className='mb-4 flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Set New Password
          </h1>
          <p className='text-sm text-muted-foreground'>
            Please enter your new password below. <br />
            Make sure it's secure and you'll remember it.
          </p>
        </div>
        <NewPasswordForm />
        <div className='mt-6 text-center'>
          <Link to='/sign-in' className='text-sm text-primary hover:underline'>
            Back to Sign In
          </Link>
        </div>
      </Card>
    </AuthLayout>
  )
}
