import { NextResponse } from 'next/server'
import pool from '../db'

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, DATE_FORMAT(enrollment_date, '%Y-%m-%d') as enrollment_date FROM students"
    )
    return NextResponse.json(rows)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, enrollment_date } = await request.json()
    const [result] = await pool.query(
      'INSERT INTO students (name, email, enrollment_date) VALUES (?, ?, ?)',
      [name, email, enrollment_date]
    )
    return NextResponse.json({
      message: 'Student created',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (result as any).insertId,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
