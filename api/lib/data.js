const mysql = require('promise-mysql'),
  _ = require('lodash')

if (
  !process.env.MYSQL_HOST ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASSWORD ||
  !process.env.MYSQL_DATABASE
) {
  console.log(
    'The environment variables MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD or MYSQL_DATABASE are missing'
  )
  process.exit(1)
}

let pool

const initPool = async () => {
  if (!pool)
    pool = await mysql.createPool({
      connectionLimit: 10,
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    })
}
const getTodos = async () => {
  await initPool()
  const query = `SELECT TodoId, TodoText, completed FROM Todos`
  console.log(query)

  return await pool.query(query)
}

const getTodo = async (todoId) => {
  console.log(todoId)
  if (!parseInt(todoId))
    return { status: 'error', message: 'todoId must be a number' }

  todoId = parseInt(todoId)

  await initPool()
  const query = `SELECT TodoId, TodoText, completed FROM Todos WHERE TodoId = ${todoId}`
  console.log(query)

  return await pool.query(query)
}

const addTodo = async (req) => {
  console.log(req.cookies)
  const todo = req.body
  console.log('Todo', todo)
  if (!todo.TodoText)
    return { status: 'error', statusCode: 400, message: 'TodoText is missing' }

  return { status: 'success', statusCode: 200, ...todo }
}

module.exports = {
  getTodos,
  getTodo,
  addTodo,
}
