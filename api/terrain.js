import {
  logger,
  getListOfFiles,
  getPureFileName,
  readAndProjectMaps
} from './helper';

const folder = './data/Contour';
const pattern = 'geosim';
const fileList = getListOfFiles(folder, pattern);
const nameToFile = getPureFileName(fileList, folder);

const preparedData = readAndProjectMaps(nameToFile, 'terrrain');

export default function terrain() {
  return Promise.resolve(preparedData);
}
