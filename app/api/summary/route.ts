import { NextResponse } from 'next/server'
import pool from '../db'
import { RowDataPacket } from 'mysql2'

// Define the shape of the query result to improve type safety
interface CountResult {
  total: number
}

export async function GET() {
  try {
    // Execute all queries concurrently using Promise.all
    const [userResults, studentResults, courseResults, assignmentResults] =
      await Promise.all([
        pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM users'),
        pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM students'),
        pool.query<RowDataPacket[]>('SELECT COUNT(*) as total FROM courses'),
        pool.query<RowDataPacket[]>(
          'SELECT COUNT(*) as total FROM student_courses'
        ),
      ])
    console.log(userResults)

    // Access the total counts from the result sets
    return NextResponse.json({
      users: (userResults[0][0] as CountResult).total,
      students: (studentResults[0][0] as CountResult).total,
      courses: (courseResults[0][0] as CountResult).total,
      assignments: (assignmentResults[0][0] as CountResult).total,
    })
  } catch (error) {
    // TypeScript guards for proper error handling
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
  }
}
