import {
  printSize,
  getPath,
  readDataFile
} from '../shared';

export {
  getPath,
  getProjection,
  logger,
  getListOfFiles,
  getPureFileName,
  printSize,
  readDataFile } from '../shared';


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
