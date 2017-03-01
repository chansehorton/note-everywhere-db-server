'use strict'

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/notes', (req, res, next) => {
  knex('notes')
    .orderBy('id')
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
