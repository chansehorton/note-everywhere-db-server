'use strict';

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ id: 1 }),
        knex('users').insert({ id: 2 }),
        knex('users').insert({ id: 3 })
      ]);
    });
};
