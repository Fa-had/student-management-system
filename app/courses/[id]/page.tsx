'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Course {
  id: number
  title: string
  description: string
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
  }, [id])

  async function handleUpdate() {
    if (!course) return
    await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: { 'Content-Type': 'application/json' },
    })
    alert('Course updated!')
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this course?')) return
    await fetch(`/api/courses/${id}`, { method: 'DELETE' })
    router.push('/courses')
  }

  if (!course) return <p>Loading...</p>

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Course Detail</h1>

      <div className='space-y-4 max-w-md'>
        <input
          type='text'
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
          className='w-full border p-2 rounded'
        />
        <textarea
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
          className='w-full border p-2 rounded'
          rows={4}
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

        <div className='flex flex-col space-y-2 mt-4'>
          <button
            onClick={() => router.push(`/courses/${id}/assign`)}
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            Assign Student to Course
          </button>
          <button
            onClick={() => router.push(`/courses/${id}/students`)}
            className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'
          >
            View Students in Course
          </button>
        </div>
      </div>
    </div>
  )
}
