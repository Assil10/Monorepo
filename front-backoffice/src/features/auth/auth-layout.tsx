import { Link } from '@tanstack/react-router'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
        <div className='mb-8 flex items-center justify-center'>
          <Link to='/' className='flex items-center'>
            <img
              src='/images/logo.png'
              alt='Korpor Logo'
              className='mr-2 h-8 w-8'
              onError={(e) => {
                // Fallback to text if image fails to load
                e.currentTarget.style.display = 'none'
              }}
            />
            <h1 className='text-2xl font-semibold'>Korpor Admin</h1>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
