const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const todos = [];

// @TODO - add authentication and sessions

app.use(bodyParser.json());

app.listen(1337, () => console.log('todo server listening...'));
