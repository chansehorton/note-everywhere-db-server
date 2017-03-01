'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id');
    table.unique(['user_id', 'url']);
    table.bigInteger('user_id').notNullable();
    table.string('url').notNullable().defaultTo('');
    table.string('note').notNullable().defaultTo('');
    table.string('note_position').notNullable().defaultTo('left');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('notes');
};
