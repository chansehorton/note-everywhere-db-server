'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', (table) => {
    table.bigInteger('id').unique().notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users');
};
