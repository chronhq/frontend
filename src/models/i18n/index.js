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
import MessagesI18n from './MessagesI18n';
import AvailableLanguages from './translation/AvailableLanguages';

import logoRu from '../../img/logo-grey-ru.svg';
import logoEn from '../../img/logo-grey-en.svg';

export default class Internationalization {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable messages = new MessagesI18n(this.rootStore);

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

  @computed get data() {
    return AvailableLanguages[this.lng];
  }

  @computed get logo() {
    return this.lng === 'ru' ? logoRu : logoEn;
  }

  @computed get nameSelector() {
    return this.data.selectors.name;
  }
}
