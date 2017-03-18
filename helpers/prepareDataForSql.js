import fs from 'fs';
import hash from 'object-hash';

import {
  getListOfFiles,
  getPureFileName,
  shiftFileNames,
  printSize,
  readDataFile
} from '../api/helper';

import db from '../database';

const bordersFile = './data/collectedBorders.json';
const folder = './data/Timeline';
const pattern = 'geomax';
const fileList = getListOfFiles(folder, pattern);
const nameToFile = shiftFileNames(getPureFileName(fileList, folder), 0);

const checkForUniqness = (empty, target, collected) => {
  const res = { ...empty };
  const hashId = hash(target);
  res.hash = hashId;
  // If its a uniq hash, then new ID is:
  if (!(hashId in collected.hash2id)) {
    res.id = Object.keys(collected.hash2id).length;
    res.hash2id[hashId] = res.id;
    res.byId[res.id] = target;
  } else { // Find an existing id for hash
    res.id = collected.hash2id[hashId];
  }
  return [res, res.id];
};

const createRequest = (data, dbName, dbKeys) =>
  Object.keys(data).sort((i, k) => i > k).map(curId =>
    db.none(`insert into ${dbName} (${dbKeys}) values($1, $2)`, [curId, data[curId]])
      .catch(error => console.error('Error, while inserting into',
      `insert into ${dbName} (${dbKeys}) values($1, $2)`, dbName, error)));

const collectData = (file) => {
  // {
  //   hash2id: { sha1: 1, sha2: 2 },
  //   byId: { sha1: 'geometry1', sha2: 'geometry2' },
  // }

  const p = () => ({
    hash2id: {}, // Collect uniq hashes and assing them to numeric ids
    byId: {}, // store geometry or properties by numeric Id
  });
  const struct = () => ({
    geo: p(),
    prop: p(),
    byYear: {}, // startYear to geo+props 1999: {geoId:propId}
    total: 0
  });
  console.time('Processing borders');
  const collectedData = Object.keys(nameToFile).reduce((prev, startYear) => {
    // startYear === year from which border is appliable
    const filename = nameToFile[startYear];
    const borders = readDataFile(filename);
    return borders.features.reduce((data, feature) => {
      const [geoData, geoId] = checkForUniqness(p(), feature.geometry, data.geo);
      const [propData, propId] = checkForUniqness(p(), feature.properties, data.prop);
      const byYear = startYear in data.byYear
          ? { ...data.byYear[startYear], [geoId]: propId }
          : { [geoId]: propId };
      return {
        geo: {
          hash2id: { ...data.geo.hash2id, ...geoData.hash2id },
          byId: { ...data.geo.byId, ...geoData.byId },
        },
        prop: {
          hash2id: { ...data.prop.hash2id, ...propData.hash2id },
          byId: { ...data.prop.byId, ...propData.byId },
        },
        byYear: { ...data.byYear, [startYear]: byYear },
        total: data.total + 1
      };
    }, prev);
  }, struct());
  console.timeEnd('Processing borders');
  fs.writeFileSync(file, JSON.stringify(collectedData));
  return collectedData;
};

const getCollectedData = () => {
  if (fs.existsSync(bordersFile)) {
    return readDataFile(bordersFile);
  }
  return collectData(bordersFile);
};

const collectedData = getCollectedData();
printSize(collectedData, 'Collected data');
printSize(collectedData.geo, 'Collected geo data');
printSize(collectedData.prop, 'Collected data');

console.log('Uniq borders', Object.keys(collectedData.geo.hash2id).length);
console.log('Uniq properties', Object.keys(collectedData.prop.hash2id).length);
console.log('Total features', collectedData.total);

// Give names to the tables
const BORDERS = 'borders';
const GEOMETRY = 'geometry';
const PROPERTIES = 'properties';

const dataTable = {
  [GEOMETRY]: collectedData.geo,
  [PROPERTIES]: collectedData.prop
};

const geoTable = `
  DROP TABLE IF EXISTS ${GEOMETRY};
  CREATE TABLE ${GEOMETRY} (
    id BIGSERIAL PRIMARY KEY,
    ${GEOMETRY} JSON NOT NULL
);`;
const propsTable = `
  DROP TABLE IF EXISTS ${PROPERTIES};
  CREATE TABLE ${PROPERTIES} (
    id BIGSERIAL PRIMARY KEY,
    ${PROPERTIES} JSON NOT NULL
);`;
const bordersTable = `
  DROP TABLE IF EXISTS ${BORDERS};
  CREATE TABLE ${BORDERS} (
    id BIGSERIAL PRIMARY KEY,
    year INT NOT NULL,
    geo BIGINT NOT NULL REFERENCES ${GEOMETRY}.id,
    props BIGINT NOT NULL REFERENCES ${PROPERTIES}.id
);`;

// Create All tables
db.none(geoTable);
db.none(propsTable);
db.none(bordersTable);

// Fill geoTable and propsTable
Object.keys(dataTable).map((cur) => createRequest(dataTable[cur].byId, cur, ['id', cur]));

// Fill bordersTable
Object.keys(collectedData.byYear).map(year =>
  Object.keys(collectedData.byYear[year]).sort((i, k) => i > k).map(geoId =>
    // const propId = collectedData.byYear[year][geoId];
    db.none(`insert into ${BORDERS} (year, geo, props) values ($1, $2, $3)`, [year, geoId, collectedData.byYear[year][geoId]])
    .catch(error => console.error('Error, while inserting into', BORDERS, error))
  )
);
