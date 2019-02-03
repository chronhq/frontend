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
import wdk from 'wikidata-sdk';

import WikidataEntity from './Entities/WikidataEntity';
import {
  wdTypesMap, instanceOf
} from './WikidataHelper';

const fallbackClass = 'misc';

function wikidataEntityFactory(entity, rootStore) {
  const simple = wdk.simplify.entity(entity);
  const type = simple.claims[instanceOf] === undefined
    ? fallbackClass
    : simple.claims[instanceOf]
      .reduce((prev, cur) => (wdTypesMap[cur] || prev), fallbackClass);
  return new WikidataEntity(rootStore, type, entity, simple);
}

export default wikidataEntityFactory;
