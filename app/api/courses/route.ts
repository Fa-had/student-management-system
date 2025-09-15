import { NextResponse } from 'next/server'
import pool from '../db'

export async function GET() {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description FROM courses'
    )
    return NextResponse.json(rows)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json()
    const [result] = await pool.query(
      'INSERT INTO courses (title, description) VALUES (?, ?)',
      [title, description]
    )
    return NextResponse.json({
      message: 'Course created',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (result as any).insertId,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
