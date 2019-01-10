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
import { computed, action, observable } from 'mobx';

class Dashboard {
  @observable hidden = false;

  @observable narrationUI = true;

  @computed get selected() {
    // returns false for global narrative
    return Boolean(this.rootStore.flags.runtime.get('SelectedCourse'));
  }

  @computed get isStorySelected() {
    // Show narrations only if narrative(course) selected
    return this.selected ? this.narrationUI : false;
  }

  @action setup() {
    this.narrationUI = this.selected;
  }

  @action toggle() {
    this.hidden = !this.hidden;
  }

  @action changeUI() {
    if (this.selected) this.narrationUI = !this.isStorySelected;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default Dashboard;
