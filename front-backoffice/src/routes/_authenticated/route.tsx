import React from 'react'
import Cookies from 'js-cookie'
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const auth = useAuthStore.getState().auth

    // Check if user is logged in
    if (!auth.accessToken || !auth.user) {
      console.log('Redirecting: No token or user')
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname === '/' ? undefined : location.pathname,
        },
      })
    }

    // Check token expiration
    if (auth.user.exp && auth.user.exp * 1000 < Date.now()) {
      console.log('Redirecting: Token expired')
      auth.reset()
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.pathname === '/' ? undefined : location.pathname,
        },
      })
    }

    // --- Role-based redirection ---
    const userRole = auth.user.role?.[0]
    let targetDashboard: string | null = null

    switch (userRole) {
      case 'super admin':
        targetDashboard = '/super-admin/dashboard'
        break
      case 'admin':
        targetDashboard = '/admin/dashboard'
        break
      case 'user':
        targetDashboard = '/user/dashboard'
        break
      default:
        console.warn('Unknown user role:', userRole)
        targetDashboard = '/user/dashboard'
    }

    if (targetDashboard && location.pathname === '/') {
      console.log(`Redirecting to role dashboard: ${targetDashboard}`)
      throw redirect({
        to: targetDashboard,
      })
    }
    // --- End Role-based redirection ---

    return { user: auth.user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

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
