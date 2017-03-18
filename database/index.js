import config from './pg.config';

const pgp = require('pg-promise')();

console.log('Database config', config);
const db = pgp(config);

export default db;
