require('dotenv').config()
const express = require('express'),
  { getTodos, getTodo } = require('./lib/fetchData')

const lport = process.env.LPORT || 3000

const app = express()
app.use(express.json())

app
  .route('/todos')
  .get(async (req, res) => res.json(await getTodos()))
  .post((req, res) => res.sendStatus(501))

app
  .route('/todos/:id')
  .get(async (req, res) => res.json(await getTodo(req.params.id)))
  .put((req, res) => res.sendStatus(501))
  .delete((req, res) => res.sendStatus(501))

app.listen(lport, () => console.log(`App listening on port ${lport}`))
