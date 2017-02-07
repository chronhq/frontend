import * as topojson from 'topojson-client';

import { readDataFile, printSize } from './helper';

function prepareData() {
  const filename = './public/us.json';
  const usData = readDataFile(filename);
  const topodata = topojson.feature(usData, usData.objects.states);
  printSize(topodata, 'TopoData');
  return topodata;
}
export default function terrain() {
  return Promise.resolve({
    terrain: prepareData()
  });
}
