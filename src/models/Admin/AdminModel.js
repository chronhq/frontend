/*
 * Chron.
 * Copyright (c) 2020 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { observable, action } from 'mobx';
import AdminSTVAddModel from './AdminSTVAddModel';

class AdminModel {
  @observable stvAddForm;

  @action stvAddFormToggle(enable, entity) {
    if (enable) {
      this.stvAddForm = new AdminSTVAddModel(this.rootStore, entity);
    } else {
      this.stvAddForm = undefined;
    }
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default AdminModel;
