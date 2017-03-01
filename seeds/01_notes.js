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
          url: "campspot.com",
          note: "user 1 made a note",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 2,
          user_id: 1,
          url: "stackoverflow.com/questions/42541327/how-to-add-a-gradient-layer-on-top-of-an-imageview",
          note: "some user 1 stack notes",
          note_position: "left"
        }),
        knex('notes').insert({
          id: 3,
          user_id: 1,
          url: "www.indeed.com/cmp/Cascade-Recruiting/jobs/Software-Engineer-Implementation-Specialist-15ac1e80231c4aa3",
          note: "user 1 notes about job",
          note_position: "right"
        }),
        knex('notes').insert({
          id: 4,
          user_id: 2,
          url: "campspot.com",
          note: "user 2 made a note",
          note_position: "right"
        }),
        knex('notes').insert({
          id: 5,
          user_id: 2,
          url: "stackoverflow.com/questions/42541327/how-to-add-a-gradient-layer-on-top-of-an-imageview",
          note: "some user 2 stack notes",
          note_position: "right"
        }),
        knex('notes').insert({
          id: 6,
          user_id: 2,
          url: "www.indeed.com/cmp/Cascade-Recruiting/jobs/Software-Engineer-Implementation-Specialist-15ac1e80231c4aa3",
          note: "user 2 notes about job",
          note_position: "left"
        })
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes))");
    });
};
