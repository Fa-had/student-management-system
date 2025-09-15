'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
}

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [id])

  async function handleUpdate() {
    if (!user) return
    await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    })
    alert('User updated!')
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this user?')) return
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    router.push('/users')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>User Detail</h1>

      <div className='space-y-4 max-w-md'>
        <input
          type='text'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className='w-full border p-2 rounded'
        />
        <input
          type='email'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className='w-full border p-2 rounded'
        />

        <div className='flex space-x-4'>
          <button
            onClick={handleUpdate}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
export default UserDetailPage
