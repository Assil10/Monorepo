import { createFileRoute } from '@tanstack/react-router'
import ResetPassword from '@/features/auth/reset-password'

export const Route = createFileRoute('/(auth)/reset-password')({
  component: ResetPassword,
  validateSearch: (search) => ({
    email: search.email ? String(search.email) : undefined,
    code: search.code ? String(search.code) : undefined,
  }),
})
