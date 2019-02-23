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
import { computed } from 'mobx';

import OceanDecor from './OceanDecor';

export default class Decor {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get oceans() {
    return Object.values(OceanDecor).map(cur => ({
      picId: cur.string[this.rootStore.i18n.lng],
      geopoint: cur.geopoint,
      size: cur.style.size,
    }));
  }
}
