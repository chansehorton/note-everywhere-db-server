'use strict'

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const boom = require('boom');

router.get('/notes', (req, res, next) => {
  const userId = req.query.userId;
  const url = decodeURIComponent(req.query.url);
  console.log(userId);
  console.log(url);

  if (userId && url) {
    knex('notes')
      .where('user_id', userId)
      .andWhere('url', url)
      .first()
      .then((note) => {
        if (!note) {
          //custom error
          return next();
        }

        res.send(note);
      })
      .catch((err) => {
        return next(err);
      });
  } else {
    knex('notes')
    .orderBy('id')
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      next(err);
    });
  }

});

router.post('/notes', (req, res, next) => {

});

router.patch('/notes/:user_url', (req, res, next) => {

});

router.delete('/notes/:user_url', (req, res, next) => {

});

module.exports = router;
