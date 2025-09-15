'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Student {
  id: number
  name: string
  email: string
  enrollment_date: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const router = useRouter()
  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>Students</h1>

      <Link
        href='/students/create'
        className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
      >
        + Add Student
      </Link>

      <table className='w-full border border-gray-200 mt-4'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 border'>ID</th>
            <th className='p-2 border'>Name</th>
            <th className='p-2 border'>Email</th>
            <th className='p-2 border'>Enrollment Date</th>
            <th className='p-2 border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className='text-center'>
                <td className='p-2 border'>{student.id}</td>
                <td className='p-2 border'>{student.name}</td>
                <td className='p-2 border'>{student.email}</td>
                <td className='p-2 border'>{student.enrollment_date}</td>
                <td className='p-2 border'>
                  <Link
                    href={`/students/${student.id}`}
                    className='text-blue-600 hover:underline'
                  >
                    View / Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className='p-4 text-gray-500'>
                No students found.
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
