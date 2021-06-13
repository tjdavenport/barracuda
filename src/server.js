const cors = require('cors');
const {v4: uuid} = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const todos = {
  [uuid()]: {done: true, notes: 'complete barracuda take-home assignment', due: new Date().getTime()},
  [uuid()]: {done: false, notes: 'clean room', due: new Date('9999-01-02').getTime()},
};

// @TODO - add authentication and sessions
// @TODO - use postgres to store todos

app.use(bodyParser.json());
app.use(cors());

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  // @TODO - server validation?
  const id = uuid();
  todos[id] = req.body;
  return res.json({id, ...req.body});
});
app.delete('/todos/:id', (req, res) => {
  delete todos[req.params.id];
  return res.sendStatus(200);
});
app.patch('/todos/:id', (req, res) => {
  // @TODO - server validation?
  todos[req.params.id] = {...todos[req.params.id], ...req.body};
  return res.json({id: req.params.id, ...req.body});
});

app.listen(1337, () => console.log('todo server listening...'));
