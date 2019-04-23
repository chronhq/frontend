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

const headers = {
  method: 'GET',
  headers: {
    accept: 'application/sparql-results+json',
  },
  cache: 'no-cache'
};

const buildRequest = (qId, { fields, values, params }, lng = 'en') => (`
  SELECT ${fields.map(f => `?${f}`).join(' ')} WHERE {
    BIND(wd:${qId} AS ?item)
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${lng}". }
    ${values.join('\n')}
  }
  ${params || ''}
`);

const wikidataEndpoint = 'https://query.wikidata.org/sparql?query=';

const buildURL = (id, params, lng = 'en') => [
  wikidataEndpoint,
  encodeURI(buildRequest(id, params, lng)),
  '&origin=*'
].join('');

export {
  headers, buildURL,
};
