import fs from 'fs';
import hash from 'object-hash';

import {
  getListOfFiles,
  getPureFileName,
  printSize,
  readDataFile,
  tables,
  SCHEMA
} from '../shared';

import db from '../shared/database';


// CONTOUR
const contoursFile = './data/collectedContours.json';
const contourFolder = './data/Contour';
const simContoursFileList = getListOfFiles(contourFolder, 'geosim');
const simContoursNameToFile = getPureFileName(simContoursFileList, contourFolder);
console.log(simContoursNameToFile);
const continentData = Object.keys(simContoursNameToFile).reduce((prev, continent) => {
  const continentFile = simContoursNameToFile[continent];
  const contData = readDataFile(continentFile);
  const contFeature = contData.features.shift();
  const contArr = [contFeature.properties.continent, contFeature.geometry];
  return [...prev, contArr];
}, []);
console.log(continentData);
fs.writeFileSync(contoursFile, JSON.stringify(continentData));
// CONTOUR

const bordersFile = './data/collectedBorders.json';
const folder = './data/Timeline';

const fileList = getListOfFiles(folder, 'geomax');
const nameToFile = getPureFileName(fileList, folder);

const simFileList = getListOfFiles(folder, 'geosim');
const simNameToFile = getPureFileName(simFileList, folder);

const sortKeys = (i, k) => Number(i) - Number(k);
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

const splitProperties = (props) => {
  const properties = {
    disputed: props.disputed,
    mapcolor13: props.mapcolor13,
    name: props.name,
    nameRu: props.nameRu,
    wikipedia: props.wikipedia
  };
  const type = {
    en: props.type_en,
    ru: props.typeRu,
    orig: props.type,
  };
  const admin = {
    sr_adm0_a3: props.sr_adm0_a3,
    en: props.admin,
    ru: props.adminRu
  };
  return { properties, type, admin };
};

const collectData = (file) => {
  const p = () => ({
    // hash2id: { sha1: 1, sha2: 2 },
    hash2id: {}, // Collect uniq hashes and assing them to numeric ids
    // byId: { 1: 'geometry1', 2: 'geometry2' },
    byId: {}, // store geometry or properties by numeric Id
  });

  const struct = () => ({
    geo: p(),
    prop: p(),
    type: p(),
    admin: p(),
    byYear: {}, // startYear to geo+props 1999: {geoId:propId}
    zero: 0,
    total: 0
  });
  console.time('Processing borders');
  const collectedData = Object.keys(nameToFile).reduce((prev, startYear) => {
    // startYear === year from which border is appliable
    const filename = nameToFile[startYear];
    const borders = readDataFile(filename);

    const simFilename = simNameToFile[startYear];
    const simBorders = readDataFile(simFilename);

    return borders.features.reduce((data, feature, fId) => {
      const [geoData, geoId] = checkForUniqness(p(), feature.geometry, data.geo);

      if (simBorders.features[fId].geometry === null) {
        console.log('SimBorders is null for', fId);
        return {
          ...data,
          zero: data.zero + 1,
          total: data.total + 1
        };
      }
      if (simBorders.features.length !== borders.features.length) {
        console.error('Different amount of features in ', filename,
          simBorders.features.length, borders.features.length);
      }
      // Take simple data instead of full
      if (geoId in geoData.byId) {
        geoData.byId[geoId] = simBorders.features[fId].geometry;
      }
      const splitedProps = splitProperties(feature.properties);
      const [typeData, typeId] = checkForUniqness(p(), splitedProps.type, data.type);
      const [adminData, adminId] = checkForUniqness(p(), splitedProps.admin, data.admin);
      splitedProps.properties.type = typeId;
      splitedProps.properties.admin = adminId;
      // console.log(splitedProps.properties);
      const [propData, propId] = checkForUniqness(p(), splitedProps.properties, data.prop);

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
        type: {
          hash2id: { ...data.type.hash2id, ...typeData.hash2id },
          byId: { ...data.type.byId, ...typeData.byId },
        },
        admin: {
          hash2id: { ...data.admin.hash2id, ...adminData.hash2id },
          byId: { ...data.admin.byId, ...adminData.byId },
        },
        byYear: { ...data.byYear, [startYear]: byYear },
        zero: data.zero,
        total: data.total + 1
      };
    }, prev);
  }, struct());
  console.timeEnd('Processing borders');
  fs.writeFileSync(file, JSON.stringify(collectedData));
  return collectedData;
};

const getCollectedData = (file) => {
  if (fs.existsSync(file)) {
    return readDataFile(file);
  }
  return collectData(file);
};

const collectedData = getCollectedData(bordersFile);
printSize(collectedData, 'Collected data');
printSize(collectedData.geo, 'Collected geo data');
printSize(collectedData.prop, 'Collected data');

console.log('Uniq borders', Object.keys(collectedData.geo.hash2id).length);
console.log('Uniq properties', Object.keys(collectedData.prop.hash2id).length);
console.log('Total features', collectedData.total);

const { BORDERS, GEOMETRY, PROPERTIES, ADMIN, TYPE } = tables;
// const BORDERS = `${SCHEMA}.borders`;
// const GEOMETRY = `${SCHEMA}.geometry`;
// const PROPERTIES = `${SCHEMA}.properties`;
// const ADMIN = `${SCHEMA}.admin`;
// const TYPE = `${SCHEMA}.type`;

const createSchema = `CREATE SCHEMA IF NOT EXISTS ${SCHEMA};`;

const geoTable = `
  CREATE TABLE ${GEOMETRY} (
    id BIGSERIAL PRIMARY KEY,
    geometry JSON NOT NULL
);`;

const adminTable = `
  CREATE TABLE ${ADMIN} (
    id SERIAL PRIMARY KEY,
    en VARCHAR(255) NULL,
    ru VARCHAR(255) NULL,
    sr_adm0_a3 VARCHAR(10) NULL
);`;

const typeTable = `
  CREATE TABLE ${TYPE} (
    id SERIAL PRIMARY KEY,
    en VARCHAR(50) NULL,
    ru VARCHAR(50) NULL,
    orig VARCHAR(50) NULL
);`;

const propsTable = `
  CREATE TABLE ${PROPERTIES} (
    id BIGSERIAL PRIMARY KEY,
    admin INT NULL REFERENCES ${ADMIN}(id),
    disputed VARCHAR(50) NULL,
    mapcolor13 INT NOT NULL,
    name VARCHAR(255) NULL,
    nameRu VARCHAR(255) NULL,
    type INT NULL REFERENCES ${TYPE}(id),
    wikipedia VARCHAR(255) NULL
);`;

const bordersTable = `
  CREATE TABLE ${BORDERS} (
    id BIGSERIAL PRIMARY KEY,
    year INT NOT NULL,
    geo BIGINT NOT NULL REFERENCES ${GEOMETRY}(id),
    props BIGINT NOT NULL REFERENCES ${PROPERTIES}(id)
);`;

const dropTables = [
  `DROP TABLE IF EXISTS ${ADMIN} CASCADE;`,
  `DROP TABLE IF EXISTS ${TYPE} CASCADE;`,
  `DROP TABLE IF EXISTS ${BORDERS} CASCADE;`,
  `DROP TABLE IF EXISTS ${GEOMETRY} CASCADE;`,
  `DROP TABLE IF EXISTS ${PROPERTIES} CASCADE;`
];

const createTables = [geoTable, typeTable, adminTable, propsTable, bordersTable];

const tablesSql = [createSchema, ...dropTables, ...createTables].join('\n');

// Drop and Create All tables
db.none(tablesSql).then(() => {
  // Fill tables
  db.tx((t) => {
    const insertList = [];

    // Fill geometry
    Object.keys(collectedData.geo.byId).sort(sortKeys).map(curId =>
      insertList.push(
        t.none(`insert into ${GEOMETRY} (id, geometry) values($1, $2)`,
          [curId, collectedData.geo.byId[curId]]))
    );

    // Fill types
    Object.keys(collectedData.type.byId).sort(sortKeys).map(curId =>
      insertList.push(
        t.none(`insert into ${TYPE} (id, en, ru, orig) values($1, $2, $3, $4)`, [
          curId,
          collectedData.type.byId[curId].en,
          collectedData.type.byId[curId].ru,
          collectedData.type.byId[curId].orig
        ])
    ));

    // Fill admin
    Object.keys(collectedData.admin.byId).sort(sortKeys).map(curId =>
      insertList.push(
        t.none(`insert into ${ADMIN} (id, ru, en, sr_adm0_a3) values($1, $2, $3, $4)`, [
          curId,
          collectedData.admin.byId[curId].ru,
          collectedData.admin.byId[curId].en,
          collectedData.admin.byId[curId].sr_adm0_a3
        ])
    ));

    // Fill props
    Object.keys(collectedData.prop.byId).sort(sortKeys).map(curId =>
      insertList.push(
        t.none(`insert into ${PROPERTIES}
        (id, admin, disputed, mapcolor13, name, nameRu, type, wikipedia)
        values($1, $2, $3, $4, $5, $6, $7, $8)`, [
          curId,
          collectedData.prop.byId[curId].admin,
          collectedData.prop.byId[curId].disputed,
          collectedData.prop.byId[curId].mapcolor13,
          collectedData.prop.byId[curId].name,
          collectedData.prop.byId[curId].nameRu,
          collectedData.prop.byId[curId].type,
          collectedData.prop.byId[curId].wikipedia,
        ])
    ));

    // Fill bordersTable
    Object.keys(collectedData.byYear).map(year =>
      Object.keys(collectedData.byYear[year]).sort(sortKeys).map(geoId =>
        insertList.push(
          t.none(`insert into ${BORDERS} (year, geo, props) values ($1, $2, $3)`,
            [year, geoId, collectedData.byYear[year][geoId]])
        )
      )
    );
    // return t.batch(insertList);
  }).catch(e => console.error(e));
});


// Contours table
const CONTOUR = tables.CONTOUR;
const contourTable = `
  CREATE TABLE ${CONTOUR} (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NULL,
    nameRu VARCHAR(255) NULL,
    contour JSON NOT NULL
);`;

db.none(contourTable).then(() => {
  // Fill tables
  db.tx((t) => {
    const insertList = [];

    // Fill contour
    continentData.map(continent =>
      insertList.push(
        t.none(`insert into ${CONTOUR} (name, contour) values($1, $2)`, continent))
    );
  });
});
