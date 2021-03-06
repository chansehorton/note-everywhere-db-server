'use strict'

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const boom = require('boom');


router.get('/notes', (req, res, next) => {
  const userId = req.query.userId;
  const url = decodeURIComponent(req.query.url);

  if (userId && url) {
    knex('notes')
      .where('user_id', userId)
      .andWhere('url', url)
      .first()
      .then((note) => {
        if (!note) {
          return next(boom.create(400, 'Bad Request. note not found'));
        }
        res.send(note);
      })
      .catch((err) => {
        next(err);
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

router.get('/notes/:id', (req, res, next) => {
  if (!req.params.id && !req.params.id.parseInt()) {
    return next(boom.create(400, 'Bad request.'));
  }

  knex('notes')
    .where('id', req.params.id)
    .first()
    .then((note) => {
      if (!note) {
        return next(boom.create(400, 'Bad Request. Note does not exist.'));
      }
      res.send(note);
    })
    .catch((err) => {
      next(err);
    });
})

router.post('/notes', (req, res, next) => {
  if (!req.body.url || !req.body.note) {
    return next(boom.create(400, 'Bad request. One or more required parameters are empty.'))
  }

  knex('notes')
    .where('user_id', req.body.user_id)
    .andWhere('url', req.body.url)
    .then((note) => {
      if (note[0]) {
        return next(boom.create(400, 'Bad request. This note already exists.'))
      } else {
        knex('notes')
          .insert(req.body, '*')
          .then((postedNote) => {
            res.send(postedNote[0]);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/notes', (req, res, next) => {
  if (!req.body || !req.body.note) {
    return next(boom.create(400, 'Bad request. Missing required data.'))
  }
  knex('notes')
    .where('user_id', req.body.user_id)
    .andWhere('url', req.body.url)
    .first()
    .then((note) => {
      if (!note) {
        return next(boom.create(400, 'Bad request. This note does not exist.'))
      } else {
        knex('notes')
          .update(req.body, '*')
          .where('user_id', req.body.user_id)
          .andWhere('url', req.body.url)
          .then((updatedNote) => {
            res.send(updatedNote[0]);
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/notes/:id', (req, res, next) => {
  let deletedNote;

  knex('notes')
    .where('id', req.params.id)
    .first()
    .then((note) => {
      if (!note) {
        return next(boom.create(400, 'Bad request. Record does not exist'));
      }

      deletedNote = note;
      knex('notes')
        .del()
        .where('id', req.params.id)
        .then(() => {
          delete deletedNote.id;
          res.send(deletedNote);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
