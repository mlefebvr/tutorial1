require('dotenv').config()
const express = require('express'),
  cors = require('cors'),
  csurf = require('csurf'),
  cookieParser = require('cookie-parser'),
  { getTodos, getTodo, addTodo } = require('./lib/data')

const lport = process.env.LPORT || 3000

const app = express()
app.use(express.json())
app.use(cors({origin: true, credentials: true, exposedHeaders: ["set-cookie"]}))
app.use(cookieParser())
app.use(csurf({cookie: true}))


app.get('/api/tutorial/token', (req, res) => {
	res.json({token: req.csrfToken() })
})


app
  .route('/api/tutorial/todos')
  .get(async (req, res) => res.json(await getTodos()))
  .post(async (req, res) => res.json(await addTodo(req)))

app
  .route('/api/tutorial/todos/:id')
  .get(async (req, res) => res.json(await getTodo(req.params.id)))
  .put((req, res) => res.sendStatus(501))
  .delete((req, res) => res.sendStatus(501))

app.listen(lport, () => console.log(`App listening on port ${lport}`))
