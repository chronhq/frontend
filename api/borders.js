import { mesh } from 'topojson-client';
import { readDataFile,
  getPath,
  getListOfFiles,
  getListOfYearsFromFiles
} from './helper';

const folder = './data/Timeline';
const pattern = 'simple';
const fileList = getListOfFiles(folder, pattern);
const yearToFile = getListOfYearsFromFiles(fileList, folder);
const genericTimelineYears = Object.keys(yearToFile).reduce((prev, cur) => {
  return { ...prev, [cur]: cur }
}, {});
const path = getPath();

function prepareData() {
  console.time('Prepare Borders Data');
  const data = Object.keys(yearToFile).reduce((prev, cur) => {
    const dataFromCurYear = readDataFile(yearToFile[cur]);
    return {
      byYear: { ...prev.byYear, [cur]: dataFromCurYear },
      projected: { ...prev.projected, [cur]: path(mesh(dataFromCurYear)) }
    }
  }, {});
  console.timeEnd('Prepare Borders Data');
  return {
    byYear: data.byYear,
    projected: data.projected
  };
}

export default function borders(req, url) {
  url.shift();
  return url[0] === 'TIMELINE'
    ? Promise.resolve({
      byYear: genericTimelineYears,
      allYears: Object.keys(genericTimelineYears)
    })
    : Promise.resolve(prepareData());
}
