import config from './pg.config';

const pgp = require('pg-promise')();

const db = pgp(config);

const SCHEMA = 'public';

export const tables = {
  BORDERS: `${SCHEMA}.borders`,
  GEOMETRY: `${SCHEMA}.geometry`,
  PROPERTIES: `${SCHEMA}.properties`,
  ADMIN: `${SCHEMA}.admin`,
  TYPE: `${SCHEMA}.type`
};

export default db;
