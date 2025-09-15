import { NextRequest, NextResponse } from 'next/server'
import pool from '../../db'

// export async function GET(
//   request: NextRequest,
//   context: { params: { id: string } }
// ): Promise<NextResponse> {
//   try {
//     const { id } = await context.params
//     const [rows] = await pool.query(
//       'SELECT id, title, description FROM courses WHERE id = ?',
//       [id]
//     )
//     if ((rows as any).length === 0) {
//       return NextResponse.json({ error: 'Course not found' }, { status: 404 })
//     }
//     return NextResponse.json((rows as any)[0])
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

// export async function PUT(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = await context.params
//     const { title, description } = await request.json()
//     await pool.query(
//       'UPDATE courses SET title = ?, description = ? WHERE id = ?',
//       [title, description, id]
//     )
//     return NextResponse.json({ message: 'Course updated' })
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = await context.params
//     await pool.query('DELETE FROM courses WHERE id = ?', [id])
//     return NextResponse.json({ message: 'Course deleted' })
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }
// }

export const GET = (async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params
  const [rows] = await pool.query('SELECT * FROM courses WHERE id = ?', [id])

  if (!Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ message: 'Course not found' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>

export const PUT = (async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params
  const body = await request.json()

  await pool.query(
    'UPDATE courses SET title = ?, description = ? WHERE id = ?',
    [body.title, body.description, id]
  )

  return NextResponse.json({ message: 'Course updated successfully' })
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>

export const DELETE = (async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params

  await pool.query('DELETE FROM courses WHERE id = ?', [id])

  return NextResponse.json({ message: 'Course deleted successfully' })
}) as unknown as (
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) => Promise<NextResponse>
