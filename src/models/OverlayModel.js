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
  observable, action, computed
} from 'mobx';

class GenericOverlayModel {
  @observable content = '';

  @observable visible = false;

  @observable left = 0;

  @observable top = 0;

  @observable transform = undefined;

  @computed get style() {
    return {
      left: this.left,
      top: this.top,
      transform: this.transform
    };
  }

  @action onMouseEvent = (visible, style, content) => {
    this.visible = visible;
    this.left = style.left;
    this.top = style.top;
    this.transform = style.transform;
    this.content = content;
  }
}

export default class OverlayModel {
  @observable tooltip = new GenericOverlayModel();
}
