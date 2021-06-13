const cors = require('cors');
const {v4: uuid} = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const todos = {
  [uuid()]: {done: true, notes: 'complete barracuda take-home assignment', due: '2021-13-06'},
  [uuid()]: {done: false, notes: 'clean room', due: '9999-01-01'},
};

// @TODO - add authentication and sessions
// @TODO - use postgres to store todos

app.use(bodyParser.json());
app.use(cors());

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  // @TODO - server validation?
  console.log(req.body);
  const id = uuid();
  todos[id] = req.body;
  return res.json({id, ...req.body});
});

app.listen(1337, () => console.log('todo server listening...'));
