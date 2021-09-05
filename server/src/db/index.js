const knex = require('knex');
const knexfile = require('./knexfile');

module.exports.db = knex(knexfile);
module.exports.db.migrate.latest();
