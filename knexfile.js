// Update with your config settings.
'use strict';

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/notes_everywhere_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/notes_everywhere_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
