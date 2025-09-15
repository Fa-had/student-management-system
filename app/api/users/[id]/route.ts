import { NextResponse } from 'next/server'
import pool from '../../db'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [
      params.id,
    ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((rows as any).length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.json((rows as any)[0])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email } = await request.json()
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      params.id,
    ])
    return NextResponse.json({ message: 'User updated' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [params.id])
    return NextResponse.json({ message: 'User deleted' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
