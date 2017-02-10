import { readDataFile, logger, getProjection } from './helper';

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
  for (const id of Object.keys(places)) {
    if (Number(id) !== Number(places[id].cityId)) {
      logger.err(`Fixing cityId from ${places[id].cityId} to ${id}`);
      places[id].cityId = id;
    }
  }
  return places;
}

function locationsProjectedData() {
  const places = locationsData();
  const project = getProjection();
  const projected = {};
  for (const id of Object.keys(places)) {
    try {
      const [x, y] = project([places[id].x, places[id].y]);
      projected[id] = { id, x, y };
    } catch (e) {
      logger.err(`Failed to project location ${id}`);
      logger.json(places[id]);
      logger.err(e.message);
      logger.err(e.stack);
    }
  }
  return {
    places,
    projected,
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
  for (const id of Object.keys(data)) {
    const loc = data[id];
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
  return { byYear: timeline, allYears: Object.keys(timeline), current: [] };
}


export default function locations(req, url) {
  url.shift(); // shifting LOCATIONS
  const urlTimeline = url.shift();

  return urlTimeline === 'TIMELINE'
    ? Promise.resolve(locationsTimeline())
    : Promise.resolve(locationsProjectedData());
}
