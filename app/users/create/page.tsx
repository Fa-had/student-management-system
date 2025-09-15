'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateUserPage = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/users')
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Create User</h1>

      <form onSubmit={handleSubmit} className='space-y-4 max-w-md'>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          Save
        </button>
      </form>
    </div>
  )
}
export default CreateUserPage
