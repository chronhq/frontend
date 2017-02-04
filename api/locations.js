import fs from 'fs';

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
let file = dummy;
try {
  file = fs.readFileSync(filename);
} catch (err) {
  console.log(err);
}
let places;

try {
  places = JSON.parse(file);
} catch (err) {
  console.error(`==>     ERROR: Error parsing your json in ${filename}`);
  console.error(err);
}

export default function locations() {
  return {
    places,
    byId: Object.keys(places)
  };
}
