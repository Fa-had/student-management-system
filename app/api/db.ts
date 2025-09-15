import mysql from 'mysql2/promise'

// const port = Number(process.env.DB_PORT) || 3306
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASS || '',
//   database: process.env.DB_NAME || 'student_managemanet',
//   port: port,
//   waitForConnections: true,
//   connectionLimit: 10,
// })
const port = Number(process.env.DB_PORT)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: port,
  waitForConnections: true,
  connectionLimit: 10,
})

export default pool
