// components/Navbar.js
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white px-6 py-4 shadow'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Student Management System
        </Link>
        <div className='space-x-4'>
          <Link href='/users' className='hover:underline'>
            Users
          </Link>
          <Link href='/students' className='hover:underline'>
            Students
          </Link>
          <Link href='/courses' className='hover:underline'>
            Courses
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
