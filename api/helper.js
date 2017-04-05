import fs from 'fs';
import sizeof from 'object-sizeof';
import db from '../shared/database';
import {
  defaultProjectionName,
  getGeoPath,
  projectionByName
} from '../shared/projections';

const wrapMessage = str => `${Date.now()} => ${str}`;

export const logger = {
  err: str => console.error(wrapMessage(str)),
  info: str => console.info(wrapMessage(str)),
  log: str => console.error(wrapMessage(str)),
  json: str => console.log(wrapMessage(JSON.stringify(str)))
};

export function printSize(obj, str) {
  const objSize = Math.round(sizeof(obj) / 8.192) / 100;
  logger.info(`${objSize}Kb  ${str}`);
}

export function returnPlainData(content) {
  return content;
}

export function parseJsonData(content) {
  let data = '';
  try {
    data = JSON.parse(content);
  } catch (err) {
    logger.err('ERROR: Error parsing your json');
    logger.err(err);
  }
  printSize(data, 'Parsed JSON');
  return data;
}

export function readDataFile(filename, parse = parseJsonData) {
  let content;
  try {
    content = fs.readFileSync(filename);
  } catch (err) {
    logger.err(err);
  }
  printSize(content, `Content from file ${filename}`);
  return parse(content);
}

export function getListOfFiles(dir, pattern) {
  const files = fs.readdirSync(dir);
  const result = files.filter(file => file.match(pattern));
  return result;
}

export function getPureFileName(files, prefix = '') {
  return files.reduce((prev, cur) => {
    return { ...prev, [cur.replace(/\..*/, '')]: `${prefix}/${cur}` };
  }, {});
}

export function shiftFileNames(nameToFile, base = 0) {
  const shifted = Object.keys(nameToFile).reduce((prev, curName) => {
    return {
      base: curName,
      names: { ...prev.names, [prev.base]: nameToFile[curName] }
    };
  }, { base, names: {} });
  return shifted.names;
}

export function getProjection(options = { name: defaultProjectionName, rotate: [0, 0, 0] }) {
  return projectionByName[options.name].rotate(options.rotate);
}

export function getPath(options = undefined) {
  return getGeoPath(getProjection(options));
}

export function readAndProjectMaps(nameToFile, type = 'borders_timeline') {
  const byKey = type === 'borders_timeline' ? 'byYear' : 'byContinent';
  const path = getPath();
  console.time(`Prepare ${type} Data`);
  const data = Object.keys(nameToFile).reduce((prev, cur) => {
    const dataFromCurYear = readDataFile(nameToFile[cur]);
    return {
      [byKey]: { ...prev[byKey], [cur]: dataFromCurYear },
      projected: { ...prev.projected,
        [cur]: dataFromCurYear
          .features.reduce(
            (prevFeature, curFeature) => [...prevFeature, path(curFeature)],
          [])
      }
    };
  }, {});
  console.timeEnd(`Prepare ${type} Data`);
  printSize(data[byKey], `Prepared ${type} JSON`);
  printSize(data.projected, `Prepared ${type} PATH`);
  return {
    [byKey]: data[byKey],
    projected: data.projected
  };
}

export const validateIds = (ids) => {
  if (typeof ids !== 'undefined' && Array.isArray(ids)) {
    return ids.reduce((prev, id) => {
      const checked = Number(id);
      return isNaN(checked) ? prev : [...prev, checked];
    }, []);
  }
  return null;
};

export function getFromDB(res, table, key, where = '', cb = () => {}) {
  db.any(`select * from ${table} ${where}`).then((data) => {
    const keyData = data.reduce(
      (prev, row) => ({ ...prev, [row.id]: row }), {});
    const cbRes = cb(data);
    res.json({ [key]: keyData, ...cbRes });
  })
  .catch((error) => {
    logger.err(error);
    res.json({ [key]: {} });
  });
}
