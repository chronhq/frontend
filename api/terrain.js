import { readDataFile, getPath } from './helper';

function prepareData() {
  const filename = './data/contour.geo.json';
  const data = readDataFile(filename);
  return data;
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
