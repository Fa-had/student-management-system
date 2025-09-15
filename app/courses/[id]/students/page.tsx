'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Student {
  id: number
  name: string
  email: string
  enrollment_date: string
}

export default function CourseStudentsPage() {
  const router = useRouter()
  const { id: courseId } = useParams<{ id: string }>()
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    fetch(`/api/courses/${courseId}/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
  }, [courseId])

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Students Assigned to Course</h1>

      {students.length > 0 ? (
        <table className='w-full border border-gray-200'>
          <thead className='bg-gray-100'>
            <tr className='text-center'>
              <th className='p-2 border'>ID</th>
              <th className='p-2 border'>Name</th>
              <th className='p-2 border'>Email</th>
              <th className='p-2 border'>Enrollment Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className='text-center'>
                <td className='p-2 border'>{s.id}</td>
                <td className='p-2 border'>{s.name}</td>
                <td className='p-2 border'>{s.email}</td>
                <td className='p-2 border'>{s.enrollment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students assigned to this course.</p>
      )}
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
