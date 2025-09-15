import { NextRequest, NextResponse } from 'next/server'
import pool from '../../db'

export const GET = (async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
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
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>

export const PUT = (async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const { name, email } = await request.json()
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      id,
    ])
    return NextResponse.json({ message: 'User updated' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>

export const DELETE = (async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    await pool.query('DELETE FROM users WHERE id = ?', [id])
    return NextResponse.json({ message: 'User deleted' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>
