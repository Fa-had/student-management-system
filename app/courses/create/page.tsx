'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateCoursePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/courses')
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Add Course</h1>

      <form onSubmit={handleSubmit} className='space-y-4 max-w-md'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border p-2 rounded'
          required
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full border p-2 rounded'
          rows={4}
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
