/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
const startEnd = [
  'OPTIONAL { ?statement pq:P580 ?start. }',
  'OPTIONAL { ?statement pq:P582 ?end. }',
];

const country = {
  params: 'LIMIT 1',
  fields: ['item', 'itemLabel', 'inception', 'dissolution', 'emblem'],
  values: [
    'OPTIONAL { ?item wdt:P571 ?inception. }',
    'OPTIONAL { ?item wdt:P576 ?dissolution. }',
    'OPTIONAL { ?item wdt:P94 ?emblem. }',
  ]
};

const flag = {
  fields: ['flag', 'start', 'end'],
  values: [
    'OPTIONAL {',
    '?item p:P41 ?statement.',
    '?statement ps:P41 ?flag.',
    ...startEnd,
    '}',
  ]
};

const capital = {
  fields: ['capital', 'capitalLabel', 'start', 'end'],
  values: [
    'OPTIONAL {',
    '?item p:P36 ?statement.',
    '?statement ps:P36 ?capital.',
    ...startEnd,
    '}',
  ]
};

const head = {
  fields: ['head', 'headLabel', 'start', 'end'],
  values: [
    'OPTIONAL {',
    '?item p:P6 ?statement.',
    '?statement ps:P6 ?head.',
    ...startEnd,
    '}',
  ]
};

const form = {
  fields: ['form', 'formLabel', 'start', 'end'],
  values: [
    'OPTIONAL {',
    '?item p:P122 ?statement.',
    '?statement ps:P122 ?form.',
    ...startEnd,
    '}',
  ]
};

const population = {
  params: 'ORDER BY DESC(?date)',
  fields: ['population', 'date'],
  values: [
    'OPTIONAL {',
    '?item p:P1082 ?statement.',
    '?statement ps:P1082 ?population.',
    'OPTIONAL { ?statement pq:P585 ?date. }',
    '}'
  ]
};

const event = {
  params: 'LIMIT 1',
  fields: ['item', 'itemLabel', 'itemDescription', 'date', 'location', 'locationLabel', 'coordinates'],
  values: [
    'OPTIONAL { ?item wdt:P585 ?date. }',
    'OPTIONAL {',
    '?item wdt:P276 ?location.',
    'OPTIONAL { ?location wdt:P625 ?coordinates. }',
    '}',
    'OPTIONAL { ?item wdt:P625 ?coordinates. }',
    'OPTIONAL { ?item wdt:P18 ?image. }',
    'OPTIONAL { ?item wdt:P1542 ?effect. }',
    'OPTIONAL { ?item wdt:P828 ?cause. }',
  ]
};

const battle = {
  fields: ['participant', 'participantLabel'],
  values: [
    'OPTIONAL { ?item wdt:P710 ?participant. }'
  ]
};

const treaty = {
  fields: ['sign'],
  values: [
    'OPTIONAL { ?item wdt:P1891 ?sign. }',
  ]
};

const person = {
  params: 'LIMIT 1',
  fields: ['item', 'itemLabel', 'itemDescription', 'placeOfBirth', 'placeOfBirthLabel',
    'placeOfDeath', 'placeOfDeathLabel', 'dateOfBirth', 'dateOfDeath', 'image'],
  values: [
    'OPTIONAL { ?item wdt:P569 ?dateOfBirth. }',
    'OPTIONAL { ?item wdt:P570 ?dateOfDeath. }',
    'OPTIONAL { ?item wdt:P19 ?placeOfBirth. }',
    'OPTIONAL { ?item wdt:P20 ?placeOfDeath. }',
    'OPTIONAL { ?item wdt:P18 ?image. }',
  ]
};

export {
  form, population, head, flag, capital, country, person, treaty, battle, event
};
