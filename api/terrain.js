import { mesh } from 'topojson-client';
import { readDataFile, getPath } from './helper';

function prepareData() {
  const filename = './data/contour.simple.json';
  const data = readDataFile(filename);
  return mesh(data);
}

export default function terrain() {
  const terrainData = prepareData();
  const path = getPath();
  const projectedData = path(terrainData);
  return Promise.resolve({
    terrain: terrainData,
    projected: projectedData
  });
}
