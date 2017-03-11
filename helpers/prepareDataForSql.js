import fs from 'fs';
import hash from 'object-hash';

import {
  getListOfFiles,
  getPureFileName,
  shiftFileNames,
  printSize,
  readDataFile
} from '../api/helper';

const folder = './data/Timeline';
const pattern = 'geomax';
const fileList = getListOfFiles(folder, pattern);
const nameToFile = shiftFileNames(getPureFileName(fileList, folder), 0);

// {
//   id2hash: { sha1: 1, sha2: 2 },
//   hash2geo: { sha1: 'geometry1', sha2: 'geometry2' },
//   data2hash: { 1999: ['sha1', 'sha2'], 2000: ['sha1', 'sha3']}
// }

const p = {
  id2hash: {},
  hash2geo: {},
  data2hash: {}
};
const struct = {
  geo: { ...p },
  prop: { ...p },
  geo2prop: {}
};
console.time('Processing borders');
const collectedData = Object.keys(nameToFile).reduce((prev, startYear) => {
  // startYear === year from which border is appliable
  const filename = nameToFile[startYear];
  const borders = readDataFile(filename);
  return borders.features.reduce((data, feature) => {
    // map over all features in this geojson file
    const collect = {
      geo: feature.geometry,
      prop: feature.properties
    }
    const tmpData = { ...struct, hash: {}, id: {} };
    Object.keys(collect).map((type) => {
      const hashId = hash(collect[type]);
      // console.log(hashId);
      const id = Object.keys(data[type].id2hash).length;
      tmpData.hash[type] = hashId;
      tmpData.id[type] = id;
      if (!(hashId in data[type].id2hash)) {
        tmpData[type].id2hash[hashId] = id;
        tmpData[type].hash2geo[hashId] = collect[type];
      }
      tmpData[type].data2hash[startYear] = startYear in data[type].data2hash
        ? [...data[type].data2hash[startYear], hashId]
        : [hashId];
    });
    return {
      geo: {
        id2hash: { ...data.geo.id2hash, ...tmpData.geo.id2hash },
        hash2geo: { ...data.geo.hash2geo, ...tmpData.geo.hash2geo },
        data2hash: { ...data.geo.data2hash, ...tmpData.geo.data2hash }
      },
      prop: {
        id2hash: { ...data.prop.id2hash, ...tmpData.prop.id2hash },
        hash2geo: { ...data.prop.hash2geo, ...tmpData.prop.hash2geo },
        data2hash: { ...data.prop.data2hash, ...tmpData.prop.data2hash }
      },
      geo2prop: { ...data.geo2prop, [tmpData.id.geo]: tmpData.id.props }
    };
  }, prev);
}, struct);
console.timeEnd('Processing borders');

printSize(collectedData, 'Collected data');
printSize(collectedData.geo, 'Collected geo data');
printSize(collectedData.prop, 'Collected data');

fs.writeFileSync('./data/collectedData.json', JSON.stringify(collectedData));
