import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/admin/dashboard')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div className='p-4'>
      <h1 className='text-xl font-semibold'>Admin Dashboard</h1>
      {/* TODO: Add Admin specific widgets and data */}
      <p>Welcome, Admin!</p>
    </div>
  )
}
