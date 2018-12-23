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

class FilterNarratives {
  @observable text = '';

  @computed get selected() {
    return Number(this.rootStore.flags.runtime.get('SelectedCourse'));
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get data() {
    return this.rootStore.data.Courses.data;
  }

  @computed get notSelected() {
    return Object.keys(this.data)
      .reduce((prev, cur) => (
        this.data[cur].id !== this.selected
          ? { ...prev, [cur]: this.data[cur] }
          : prev
      ), {});
  }

  filter = (id) => {
    const { author, description, name } = this.data[id];
    return [author, description, name].some(cur => (
      cur[this.lng].toLowerCase().indexOf(this.text.toLowerCase()) > -1));
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
    if (this.text.length === 0) return this.notSelected;
    return this.filtered;
  }

  @action setText(text) {
    this.text = text;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default FilterNarratives;
