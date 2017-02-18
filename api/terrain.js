import { mesh } from 'topojson-client';
import { readDataFile, getPath } from './helper';

function prepareData() {
  const filename = './data/contour.simple.json';
  const data = readDataFile(filename);
  return data;
}

export default function terrain() {
  const terrainData = prepareData();
  const path = getPath();
  const projectedData = path(mesh(terrainData));
  return Promise.resolve({
    terrain: terrainData,
    projected: projectedData
  });
}
