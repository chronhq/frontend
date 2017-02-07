import fs from 'fs';
import { readDataFile } from './helper';

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

const filename = './data/cities1.json';

const places = readDataFile(filename) || JSON.parse(dummy);

export default function locations() {
  return Promise.resolve({
    places,
    allIds: Object.keys(places)
  });
}
