'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Student {
  id: number
  name: string
  email: string
  enrollment_date: string
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    fetch(`/api/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
  }, [id])

  async function handleUpdate() {
    if (!student) return
    await fetch(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(student),
      headers: { 'Content-Type': 'application/json' },
    })
    alert('Student updated!')
    router.push('/students')
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this student?')) return
    await fetch(`/api/students/${id}`, { method: 'DELETE' })
    router.push('/students')
  }

  if (!student) return <p>Loading...</p>

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Student Detail</h1>

      <div className='space-y-4 max-w-md'>
        <input
          type='text'
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          className='w-full border p-2 rounded'
        />
        <input
          type='email'
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
          className='w-full border p-2 rounded'
        />
        <input
          type='date'
          value={student.enrollment_date}
          onChange={(e) =>
            setStudent({ ...student, enrollment_date: e.target.value })
          }
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
          <button
            onClick={router.back}
            className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
