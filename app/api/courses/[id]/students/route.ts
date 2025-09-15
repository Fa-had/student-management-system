import { NextResponse } from 'next/server'
import pool from '@/app/api/db'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.email, s.enrollment_date
       FROM students s
       JOIN student_courses sc ON s.id = sc.student_id
       WHERE sc.course_id = ?`,
      [id]
    )

    return NextResponse.json(rows)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
