'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <Link
        href='/users/create'
        className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        + Add User
      </Link>

      <table className='w-full border border-gray-200'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 border'>ID</th>
            <th className='p-2 border'>Name</th>
            <th className='p-2 border'>Email</th>
            <th className='p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className='text-center'>
                <td className='p-2 border'>{user.id}</td>
                <td className='p-2 border'>{user.name}</td>
                <td className='p-2 border'>{user.email}</td>
                <td className='p-2 border'>
                  <Link
                    href={`/users/${user.id}`}
                    className='text-blue-600 hover:underline'
                  >
                    View / Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className='p-4 text-gray-500'>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default UsersPage
