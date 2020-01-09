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
import { action, observable } from 'mobx';

class FormModel {
  @observable selected = undefined;

  @observable edit = false;

  @observable data = {};

  @observable status = {};

  @action select(id, edit = false) {
    if (id !== this.selected) {
      this.data = {};
      this.selected = id;
      this.edit = edit;
    } else if (id === this.selected && !edit) {
      this.selected = undefined;
    } else {
      this.edit = !this.edit;
    }
  }
}
export default class AdminModel {
  @observable isOpened = false;

  @observable screenList = ['te', 'narrative', 'sandbox'];

  @observable forms = ['te', 'pr', 'stv']
    .reduce((prev, cur) => ({ ...prev, [cur]: new FormModel() }), {});
}
