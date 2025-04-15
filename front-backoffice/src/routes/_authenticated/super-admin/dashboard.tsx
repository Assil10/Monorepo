import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/super-admin/dashboard')({
  component: SuperAdminDashboard,
})

function SuperAdminDashboard() {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>Super Admin Dashboard</h1>
      {/* TODO: Add Super Admin specific widgets and data */}
      <p>Welcome, Super Admin!</p>
    </div>
  )
}
