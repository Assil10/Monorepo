import Cookies from 'js-cookie'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { useValidateToken } from '@/hooks/use-auth'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const auth = useAuthStore.getState().auth

    // Check if user is logged in
    if (!auth.accessToken || !auth.user) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: window.location.pathname,
        },
      })
    }

    // Check token expiration
    if (auth.user.exp && auth.user.exp * 1000 < Date.now()) {
      auth.reset()
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: window.location.pathname,
        },
      })
    }

    return { user: auth.user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  const validateToken = useValidateToken()

  // If token validation fails, redirect to sign in
  if (validateToken.isError) {
    useAuthStore.getState().auth.reset()
    throw redirect({
      to: '/sign-in',
      search: {
        redirect: window.location.pathname,
      },
    })
  }

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
