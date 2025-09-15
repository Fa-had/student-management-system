'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Student {
  id: number
  name: string
}

export default function AssignStudentPage() {
  const router = useRouter()
  const { id: courseId } = useParams<{ id: string }>()
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
  }, [])

  async function handleAssign() {
    if (!selectedStudent) return

    await fetch('/api/student-courses', {
      method: 'POST',
      body: JSON.stringify({
        student_id: selectedStudent,
        course_id: courseId,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    alert('Student assigned successfully!')
    router.back()
  }

  return (
    <div className='space-y-6 max-w-md'>
      <h1 className='text-2xl font-bold'>Assign Student to Course</h1>

      <select
        value={selectedStudent ?? ''}
        onChange={(e) => setSelectedStudent(Number(e.target.value))}
        className='w-full border p-2 rounded'
      >
        <option value=''>Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
      >
        Assign
      </button>
      <button
        onClick={router.back}
        className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mx-3'
      >
        Back
      </button>
    </div>
  )
}
