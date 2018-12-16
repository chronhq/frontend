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
import { action, observable, computed } from 'mobx';

import Actors from './StoreTypes/ActorsStoreType';
import GenericType from './StoreTypes/GenericStoreType';

class WikidataStore {
  @observable battles;

  @observable actors;

  @observable documents;

  @action fetchAll() {
    this.rootStore.wikidata.getItems(this.list);
  }

  @computed get list() {
    return [
      ...this.battles.list, ...this.actors.list, ...this.documents.list
    ];
  }

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.battles = new GenericType(rootStore, 'battle');
    this.actors = new Actors(rootStore, 'person');
    this.documents = new GenericType(rootStore, 'document');
  }
}

export default WikidataStore;
