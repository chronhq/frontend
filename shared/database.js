import config from './pg.config';
import { logger } from './logger';

const pgp = require('pg-promise')();

const db = pgp(config);

export const SCHEMA = 'public';

export const tables = {
  // Inventions
  CITIES: `${SCHEMA}.cities`,
  GEO_EVENTS: `${SCHEMA}.geo_events`,
  PERSONS: `${SCHEMA}.persons`,
  INVENTIONS: `${SCHEMA}.inventions`,
  // Contour
  CONTOUR: `${SCHEMA}.contour`,
  // Geometry related
  BORDERS: `${SCHEMA}.borders`,
  GEOMETRY: `${SCHEMA}.geometry`,
  PROPERTIES: `${SCHEMA}.properties`,
  ADMIN: `${SCHEMA}.admin`,
  TYPE: `${SCHEMA}.type`
};

export function getFromDB(resCb, table, key, where = '', dataCb = () => {}) {
  db.any(`select * from ${table} ${where}`).then((data) => {
    const keyData = data.reduce(
      (prev, row) => ({ ...prev, [row.id]: row }), {});
    const cbRes = dataCb(data);
    resCb({ [key]: keyData, ...cbRes });
  })
  .catch((error) => {
    logger.err(error);
    resCb({ [key]: {} });
  });
}

export default db;
