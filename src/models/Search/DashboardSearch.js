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
import { observable, computed } from 'mobx';

import GenericFilter from './GenericFilter';

class DashboardSearch {
  @observable Narratives;

  @observable Narrations;

  @computed get filter() {
    return this.rootStore.dashboard.isStorySelected
      ? this.Narrations : this.Narratives;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.Narrations = new GenericFilter(this.rootStore, 'narrations', true);
    this.Narrations.selectText = d => [d.description, d.title];

    // TODO search in tags
    this.Narratives = new GenericFilter(this.rootStore, 'narratives', false);
    this.Narratives.selectText = d => [d.author, d.description, d.title, d.tags.join(' ')];
  }
}

export default DashboardSearch;
