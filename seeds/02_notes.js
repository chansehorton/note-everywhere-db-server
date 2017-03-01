'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('notes').insert({
          id: 1,
          user_id: 1,
          url: "",
          note: "",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 2,
          user_id: 1,
          url: "",
          note: "",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 3,
          user_id: 1,
          url: "",
          note: "",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 4,
          user_id: 2,
          url: "",
          note: "",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 5,
          user_id: 2,
          url: "",
          note: "",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 6,
          user_id: 2,
          url: "",
          note: "",
          note_position: "left"
        })
      ]);
    })
    .then( () => {
      return knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes))");
    });
};
