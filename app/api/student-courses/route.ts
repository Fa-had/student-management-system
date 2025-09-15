// app/api/student-courses/route.ts
import { NextResponse } from 'next/server'
import pool from '../db'

export async function POST(request: Request) {
  try {
    const { student_id, course_id } = await request.json()

    await pool.query(
      'INSERT IGNORE INTO student_courses (student_id, course_id) VALUES (?, ?)',
      [student_id, course_id]
    )

    return NextResponse.json({ message: 'Student assigned to course' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
