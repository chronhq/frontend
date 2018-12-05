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

// List of wikidata properties
const wdProps = {
  items: {
    P17: 'country',
    P31: 'instanceOf',
    P710: 'participant',
  },
  places: {
    P19: 'placeOfBirth',
    P20: 'placeOfDeath',
    P276: 'location', // (city, place)
  },
  images: {
    P18: 'image',
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
};

const wdTypes = {
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
  }
};

// flat structure of wdTypes { Q_id: type }
const wdTypesMap = Object.keys(wdTypes)
  .reduce((prev, cur) => ({
    ...prev,
    ...Object.keys(wdTypes[cur])
      .reduce((p, c) => ({ ...p, [c]: cur }), {})
  }), {});

const getWikimediaURI = (name) => {
  // thumbwidth in pixels
  const width = 250;
  const api = 'commons.wikimedia.org/w/api.php';
  const file = encodeURI(name);
  const params = [
    'action=query',
    'prop=imageinfo',
    'iiprop=url',
    'format=json',
    'origin=*', // for Browser request (CORB)
    `titles=File:${file}`,
    `iiurlwidth=${width}`,
  ].join('&');
  return `https://${api}?${params}`;
};

export {
  wdProps,
  wdTypes,
  wdTypesMap,
  getWikimediaURI
};
