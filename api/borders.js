import {
  getListOfFiles,
  getPureFileName,
  readAndProjectMaps
} from './helper';

const folder = './data/Timeline';
const pattern = 'geosim';
const fileList = getListOfFiles(folder, pattern);
const nameToFile = getPureFileName(fileList, folder);
const genericTimelineYears = Object.keys(nameToFile).reduce((prev, cur) => {
  return { ...prev, [cur]: cur };
}, {});

const preparedData = readAndProjectMaps(nameToFile, 'borders_timeline');

export default function borders(req, url) {
  url.shift();
  return url[0] === 'TIMELINE'
    ? Promise.resolve({
      byYear: genericTimelineYears,
      allYears: Object.keys(genericTimelineYears)
    })
    : Promise.resolve(preparedData);
}
