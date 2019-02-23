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
import { observable, computed, action } from 'mobx';
import AvailableLanguages from './translation/AvailableLanguages';

import logo from '../../img/logo-long.svg';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable logo = logo;

  @observable languages =
    Object.keys(AvailableLanguages)
      .reduce((prev, cur) => ({
        ...prev,
        [cur]: AvailableLanguages[cur].language
      }), {});

  @observable lng = 'en';

  // language for wikidata entities if selected is not present
  @observable fallback = 'en';

  @action select(languages) {
    if (languages in this.languages) {
      this.lng = languages;
    }
  }

  @computed get dateToString() {
    const { date } = this.data;
    return d => d.toLocaleString(date.locale, date.options);
  }

  @computed get data() {
    return AvailableLanguages[this.lng];
  }
}
