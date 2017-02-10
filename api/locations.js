import { readDataFile, logger } from './helper';

const dummy = `{
  "285": {
    "cityId": 285,
    "scaleRank": 0,
    "class": "Populated place",
    "name": "New York",
    "nameRu": "Нью-Йорк",
    "founded": "1624",
    "nameAlt": "New York-Newark",
    "adminName_0": "United States of America",
    "adminN_0": "USA",
    "adminName_1": "New York",
    "geonameId": 5128581,
    "area_km": 1137,
    "perim_km": 497,
    "population": 8008278,
    "elevation": 10,
    "timeZone": "America/New_York",
    "x": -73.981962787406815,
    "y": 40.75192492259464
  }
}`;

function locationsData() {
  const filename = './data/cities1.json';
  const places = readDataFile(filename) || JSON.parse(dummy);
  return {
    places,
    allIds: Object.keys(places)
  };
}

function validateYear(loc) {
  let year = 0;
  if (typeof loc.founded === 'undefined') {
    logger.err(`${loc.cityId} => Unknown date of city foundation`);
  } else if (!(String(loc.founded).match(/\d/))) {
    logger.err(`${loc.cityId} => Strange year '${loc.founded}'`);
  } else {
    try {
      year = Number(loc.founded.split('-').shift());
    } catch (e) {
      logger.err(`${loc.cityId} => Casting to Number error`);
      logger.err(JSON.stringify(loc));
      logger.err(e.message);
      logger.err(e.state);
    }
  }
  return year;
}

function locationsTimeline() {
  const data = locationsData();
  const timeline = {};
  for (const id of data.allIds) {
    const loc = data.places[id];
    const year = validateYear(loc);

    if (!(year in timeline)) {
      timeline[year] = [];
    }
    timeline[year] = [...timeline[year], loc.cityId];
  }

  let previousYear;
  for (const currentYear of Object.keys(timeline)) {
    if (!(typeof previousYear === 'undefined')) {
      timeline[currentYear] = [...timeline[previousYear], ...timeline[currentYear]];
    }
    previousYear = currentYear;
  }
  return { byYear: timeline, allYears: Object.keys(timeline) };
}


export default function locations(req, url) {
  url.shift(); // shifting LOCATIONS
  const urlTimeline = url.shift();

  return urlTimeline === 'TIMELINE'
    ? Promise.resolve(locationsTimeline())
    : Promise.resolve(locationsData());
}
