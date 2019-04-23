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
import {
  computed, action, observable
} from 'mobx';

import WikidataCountryItem from './Items/WikidataCountryItem';
import WikidataPersonItem from './Items/WikidataPersonItem';
import { WikidataTreatyItem, WikidataBattleItem } from './Items/WikidataItem';

class Wikidata {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @observable cache = {};

  @action add(type, id) {
    if (this.cache[id] === undefined) {
      if (type === 'country') this.cache[id] = new WikidataCountryItem(id, this.rootStore);
      if (type === 'document') this.cache[id] = new WikidataTreatyItem(id, this.rootStore);
      if (type === 'battle') this.cache[id] = new WikidataBattleItem(id, this.rootStore);
      if (type === 'birth' || type === 'death') {
        this.cache[id] = new WikidataPersonItem(id, this.rootStore);
      }
    }
  }
}

export default Wikidata;
