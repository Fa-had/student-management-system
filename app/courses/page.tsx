'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Course {
  id: number
  title: string
  description: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const router = useRouter()
  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Courses</h1>

      <Link
        href='/courses/create'
        className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        + Add Course
      </Link>

      <table className='w-full border border-gray-200 mt-4'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 border'>ID</th>
            <th className='p-2 border'>Title</th>
            <th className='p-2 border'>Description</th>
            <th className='p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id} className='text-center'>
                <td className='p-2 border'>{course.id}</td>
                <td className='p-2 border'>{course.title}</td>
                <td className='p-2 border'>{course.description}</td>
                <td className='p-2 border'>
                  <Link
                    href={`/courses/${course.id}`}
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
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className='flex justify-center'>
        <button
          onClick={router.back}
          className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
        >
          Back
        </button>
      </div>
    </div>
  )
}
