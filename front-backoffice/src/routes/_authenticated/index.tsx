import { useEffect } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { useValidateToken } from '@/hooks/use-auth'

// This route will handle authentication checks for all protected routes
export const Route = createFileRoute('/_authenticated/')({
  beforeLoad: async ({ context }) => {
    const auth = useAuthStore.getState().auth

    // Check if user is logged in
    if (!auth.accessToken || !auth.user) {
      // Redirect to login if not authenticated
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: window.location.pathname,
        },
      })
    }

    // Return the current user for use in the component
    return { user: auth.user }
  },
  loader: async ({ context }) => {
    // Prefetch the validation query to ensure token is valid
    await context.queryClient.prefetchQuery({
      queryKey: ['validateToken'],
      queryFn: () => {
        // This would be your API call to validate the token
        // For now, we'll just return a placeholder
        return Promise.resolve({ valid: true })
      },
    })
  },
  component: Index,
})

function Index() {
  const { user } = Route.useRouteContext()
  const validateToken = useValidateToken()

  useEffect(() => {
    // If token validation fails, it will automatically redirect via
    // the error handler in the query client (see main.tsx)
  }, [validateToken.data])

  return (
    <div className='container py-6'>
      <h1 className='mb-4 text-2xl font-bold'>Welcome, {user.accountNo}</h1>
      <p className='text-muted-foreground'>
        You're logged in to the authenticated dashboard.
      </p>
    </div>
  )
}
