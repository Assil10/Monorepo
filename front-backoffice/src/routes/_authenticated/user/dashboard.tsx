import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/user/dashboard')({
  component: UserDashboard,
})

function UserDashboard() {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>User Dashboard</h1>
      {/* TODO: Add User specific widgets and data */}
      <p>Welcome, User!</p>
    </div>
  )
}
