import { readDataFile, logger, getProjection } from './helper';
import { getFromDB } from './helper';
import { tables } from '../shared/database';

function projectLocations(data) {
  const project = getProjection();
  const projected = data.reduce((prev, cur) => {
    const [x, y] = project([cur.x, cur.y]);
    return { ...prev, [cur.id]: { id: cur.id, x, y } };
  }, {});
  return { projected };
}

function getLocations(res) {
  getFromDB(res, 'public.cities', 'places', '', projectLocations);
}

// function validateYear(loc) {
//   let year = 0;
//   if (typeof loc.founded === 'undefined') {
//     logger.err(`${loc.cityId} => Unknown date of city foundation`);
//   } else if (!(String(loc.founded).match(/\d/))) {
//     logger.err(`${loc.cityId} => Strange year '${loc.founded}'`);
//   } else {
//     try {
//       year = Number(loc.founded.split('-').shift());
//     } catch (e) {
//       logger.err(`${loc.cityId} => Casting to Number error`);
//       logger.err(JSON.stringify(loc));
//       logger.err(e.message);
//       logger.err(e.state);
//     }
//   }
//   return year;
// }

// function locationsTimeline() {
//   const data = locationsData();
//   const timeline = {};
//   for (const id of Object.keys(data)) {
//     const loc = data[id];
//     const year = validateYear(loc);

//     if (!(year in timeline)) {
//       timeline[year] = [];
//     }
//     timeline[year] = [...timeline[year], loc.cityId];
//   }

//   let previousYear;
//   for (const currentYear of Object.keys(timeline)) {
//     if (!(typeof previousYear === 'undefined')) {
//       timeline[currentYear] = [...timeline[previousYear], ...timeline[currentYear]];
//     }
//     previousYear = currentYear;
//   }
//   return { byYear: timeline, allYears: Object.keys(timeline), current: [] };
// }



export default function locations(req, res, url) {
  url.shift(); // shifting LOCATIONS
  // const urlTimeline = url.shift();
  getLocations(res);
  // return urlTimeline === 'TIMELINE'
  //   ? Promise.resolve(locationsTimeline())
  //   : Promise.resolve(locationsProjectedData());
}
