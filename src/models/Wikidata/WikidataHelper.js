/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const instanceOf = 'P31';
const natureOfStatement = {
  id: 'P5102',
  deFacto: 'Q712144',
  deJure: 'Q132555',
};

// List of wikidata properties
const wdProps = {
  items: {
    P17: 'country',
    P710: 'participant',
  },
  places: {
    P19: 'placeOfBirth',
    P20: 'placeOfDeath',
    P276: 'location', // (city, place)
    P291: 'publicationPlace', // For documents
  },
  images: {
    P18: 'image',
    P41: 'flagImage',
    P94: 'coatOfArmsImage'
  },
  points: {
    P625: 'coordinateLocation', // coordinate location
  },
  dates: {
    P569: 'dateOfBirth',
    P570: 'dateOfDeath',
    P577: 'publicationDate',
    P585: 'pointInTime',
    P571: 'inception',
  },
  territorialEntities: {
    capital: 'P36',
    headOfGovernment: 'P6',
    basicFormOfGovernment: 'P122',
  },
};

const wdTypes = {
  territorialEntities: {
    Q6256: 'country',
    Q48349: 'empire',
    Q3024240: 'historicalCountry',
    Q1048835: 'politicalTerritorialEntity',
    Q1496967: 'territorialEntity',
    Q56061: 'administrativeTerritorialEntity',
  },
  battles: {
    Q178561: 'battle',
    Q180684: 'conflict',
    Q124757: 'riot',
    Q1261499: 'navalBattle',
  },
  documents: {
    Q49848: 'document',
    Q680655: 'constitutionalDocument',
    Q820655: 'statute',
    Q625298: 'peaceTreaty',
    Q131569: 'treaty',
  },
  actors: {
    Q5: 'human',
    Q215627: 'person', // should not be used as `instalce of`
    Q20643955: 'humanBiblicalFigure',
    Q21070568: 'humanWhoMayBeFictional',
    // P6: 'headOfGovernment',
    // P35: 'headOfState',
  }
};

// flat structure of wdTypes { Q_id: type }
const wdTypesMap = Object.keys(wdTypes)
  .reduce((prev, cur) => ({
    ...prev,
    ...Object.keys(wdTypes[cur])
      .reduce((p, c) => ({ ...p, [c]: cur }), {})
  }), {});

const getWikimediaURI = (names) => {
  // thumbwidth in pixels
  const width = 250;
  const api = 'commons.wikimedia.org/w/api.php';
  const files = names.map(name => `File:${encodeURI(name)}`).join('|');
  const params = [
    'action=query',
    'prop=imageinfo',
    'iiprop=url',
    'format=json',
    'origin=*', // for Browser request (CORB)
    `titles=${files}`, // TODO: check for GET request string length
    `iiurlwidth=${width}`,
  ].join('&');
  return `https://${api}?${params}`;
};

const typesMapping = {
  // { id: 'geo', pic: 30 }, // SimpleInfoPin
  // { id: 'inv', pic: 27 }, // SimpleBulb
  // { id: 'star', pic: 31 }, // SimpleStar
  battle: { id: 178561, pic: 32, store: 'battles', },
  document: { id: 131569, pic: 24, store: 'documents', },
  birth: { id: 569, pic: 26, store: 'actors', },
  death: { id: 570, pic: 28, store: 'actors', },
};

export {
  natureOfStatement,
  instanceOf,
  typesMapping,
  wdProps,
  wdTypes,
  wdTypesMap,
  getWikimediaURI
};
