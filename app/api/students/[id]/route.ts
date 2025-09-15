import { NextRequest, NextResponse } from 'next/server'
import pool from '../../db'

export const GET = (async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params
    const [rows] = await pool.query(
      "SELECT id, name, email, DATE_FORMAT(enrollment_date, '%Y-%m-%d') as enrollment_date FROM students WHERE id = ?",
      [id]
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((rows as any).length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
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
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params
    const { name, email, enrollment_date } = await request.json()
    await pool.query(
      'UPDATE students SET name = ?, email = ?, enrollment_date = ? WHERE id = ?',
      [name, email, enrollment_date, id]
    )
    return NextResponse.json({ message: 'Student updated' })
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
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params
    await pool.query('DELETE FROM students WHERE id = ?', [id])
    return NextResponse.json({ message: 'Student deleted' })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>
