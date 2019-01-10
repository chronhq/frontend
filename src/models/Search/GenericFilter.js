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

class GenericFilter {
  @observable text = '';

  @observable dataSelector = '';

  @observable entitiesSelector = 'data';

  @computed get selected() {
    return Number(this.rootStore.flags.runtime.get('SelectedCourse'));
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get data() {
    return this.rootStore.data[this.dataSelector].data;
  }

  @computed get notSelected() {
    return Object.keys(this.data)
      .reduce((prev, cur) => (
        this.data[cur].id !== this.selected
          ? { ...prev, [cur]: this.data[cur] }
          : prev
      ), {});
  }


  selectText = d => ([d.description]);

  textCb = t => t[this.lng];

  filterCb = cur => (
    this.textCb(cur).toLowerCase().indexOf(this.text.toLowerCase()) > -1);

  filter = (id) => {
    const fields = this.selectText(this.data[id]);
    return fields.some(this.filterCb);
  }

  @computed get filtered() {
    return Object.keys(this.data)
      .reduce((prev, cur) => (
        this.filter(cur)
          ? { ...prev, [cur]: this.data[cur] }
          : prev
      ), {});
  }

  @computed get entities() {
    if (this.text.length === 0) return this[this.entitiesSelector];
    return this.filtered;
  }

  @action setText(text) {
    this.text = text;
  }

  constructor(rootStore, dataSelector, selectAll = false) {
    this.rootStore = rootStore;
    this.dataSelector = dataSelector;
    this.entitiesSelector = selectAll === true ? 'data' : 'notSelected';
  }
}

export default GenericFilter;
