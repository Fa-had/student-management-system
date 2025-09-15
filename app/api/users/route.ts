import { NextResponse } from 'next/server'
import pool from '../db'

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    return NextResponse.json(rows)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    )
    return NextResponse.json({
      message: 'User created',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (result as any).insertId,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
