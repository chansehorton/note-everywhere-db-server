'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3008;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

app.use(bodyParser.json());

const notes = require('./routes/notes');

app.use(isAuth);
app.use(notes);

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use((err, req, res, next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  console.error(err.stack);
  res.sendStatus(500);
});

function isAuth(req, res, next) {
  const authStr = req.headers.authorization;
  const auth = new RegExp(process.env.AUTH, 'g');

  if (!auth.test(authStr)) {
    return res
    .set('Content-Type', 'text/plain')
    .send('Authorization failed.');
  } else {
    return next();
  }
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
