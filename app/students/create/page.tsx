'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateStudentPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [enrollmentDate, setEnrollmentDate] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify({ name, email, enrollment_date: enrollmentDate }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/students')
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Add Student</h1>

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
        <input
          type='date'
          placeholder='Enrollment Date'
          value={enrollmentDate}
          onChange={(e) => setEnrollmentDate(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <button
          type='submit'
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          Save
        </button>
        <button
          onClick={router.back}
          className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mx-3'
        >
          Back
        </button>
      </form>
    </div>
  )
}
