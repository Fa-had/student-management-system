'use client'

import Card from '@/components/Card'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Summary {
  users: number
  students: number
  courses: number
  assignments: number
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null)

  useEffect(() => {
    fetch('/api/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data))
  }, [])

  if (!summary) return <p>Loading dashboard...</p>

  return (
    <div className='px-10 space-y-6 w-full'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <div className='flex w-full justify-center'>
        <div className='grid grid-cols-3 gap-5 w-[800px]'>
          <Card name='Users' total={summary.users} path='/users' />
          <Card name='Students' total={summary.students} path='/students' />
          <Card name='Courses' total={summary.courses} path='/courses' />
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-semibold mb-3'>Quick Links</h2>
        <ul className='list-disc pl-6 space-y-2'>
          <li>
            <Link href='/users' className='text-blue-600 hover:underline'>
              Manage Users
            </Link>
          </li>
          <li>
            <Link href='/students' className='text-blue-600 hover:underline'>
              Manage Students
            </Link>
          </li>
          <li>
            <Link href='/courses' className='text-blue-600 hover:underline'>
              Manage Courses
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
