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
import { computed, observable } from 'mobx';

export default class TraceModel {
  @observable data = {};

  @computed get timedTraces() {
    let fullPath = 0;
    const dataWithTime = this.data.path[0].path.slice(1).map((n, i) => {
      const lastPath = Math.hypot(
        n[0] - this.data.path[0].path[i][0],
        n[1] - this.data.path[0].path[i][1]
      );
      fullPath += lastPath;
      return [...n, (fullPath / 100)];
    });
    return [[...this.data.path[0].path[0], 0], ...dataWithTime];
  }

  constructor(data) {
    this.data = data;
  }
}
