import { Link } from '@tanstack/react-router'
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react'
import { useAuthStore } from '@/stores/authStore'
import { useSignOut } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserMenu() {
  const { user } = useAuthStore((state) => state.auth)
  const signOut = useSignOut()

  // If user is not logged in, don't show anything
  if (!user) {
    return null
  }

  // Get initials for avatar fallback
  const initials = user.email
    .split('@')[0]
    .split('.')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={undefined} alt={user.email} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Account #{user.accountNo}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/profile' className='cursor-pointer'>
            <IconUser className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to='/settings' className='cursor-pointer'>
            <IconSettings className='mr-2 h-4 w-4' />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          disabled={signOut.isPending}
          onClick={() => signOut.mutate()}
        >
          <IconLogout className='mr-2 h-4 w-4' />
          <span>{signOut.isPending ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
