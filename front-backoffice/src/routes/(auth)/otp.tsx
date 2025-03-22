import { createFileRoute } from '@tanstack/react-router'
import Otp from '@/features/auth/otp'

export const Route = createFileRoute('/(auth)/otp')({
  component: Otp,
  validateSearch: (search) => ({
    email: search.email ? String(search.email) : undefined,
    type: search.type === 'reset-password' ? 'reset-password' : 'verify-email',
  }),
})
