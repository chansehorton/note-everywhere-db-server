'use strict'

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
