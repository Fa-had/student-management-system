/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import pool from '../../db'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const [rows] = await pool.query(
      'SELECT id, title, description FROM courses WHERE id = ?',
      [id]
    )
    if ((rows as any).length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }
    return NextResponse.json((rows as any)[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const { title, description } = await request.json()
    await pool.query(
      'UPDATE courses SET title = ?, description = ? WHERE id = ?',
      [title, description, id]
    )
    return NextResponse.json({ message: 'Course updated' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    await pool.query('DELETE FROM courses WHERE id = ?', [id])
    return NextResponse.json({ message: 'Course deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
