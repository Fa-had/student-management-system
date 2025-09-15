import Link from 'next/link'

const DashboardPage = () => {
  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p className='text-gray-600'>Welcome to the Student Management System</p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <Link
          href='/users'
          className='block rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition'
        >
          <h2 className='text-xl font-semibold'>Manage Users</h2>
          <p className='text-gray-500'>
            Create, view, update, and delete users.
          </p>
        </Link>

        <Link
          href='/students'
          className='block rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition'
        >
          <h2 className='text-xl font-semibold'>Manage Students</h2>
          <p className='text-gray-500'>Perform CRUD operations on students.</p>
        </Link>

        <Link
          href='/courses'
          className='block rounded-xl border border-gray-200 bg-white p-6 shadow hover:shadow-md transition'
        >
          <h2 className='text-xl font-semibold'>Manage Courses</h2>
          <p className='text-gray-500'>Handle CRUD actions for courses.</p>
        </Link>
      </div>
    </div>
  )
}
export default DashboardPage
