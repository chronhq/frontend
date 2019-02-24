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

export default class SpaceTimeVolumeModel {
  @computed get data() {
    return this.rootStore.data.spacetimeVolumes.data;
  }

  @computed get current() {
    if (this.data === undefined) return {};
    return Object.values(this.data).reduce((prev, cur) => (
      cur.visible
        ? ({ ...prev, [cur.id]: cur })
        : prev), {});
  }

  @computed get wIds() {
    return Object.keys(this.current).map(stv => this.current[stv].wId);
  }

  hovering(ap) {
    if (ap.layer.id === this.rootStore.mapStyle.atomicBorders.layerName) {
      try {
        const stvs = JSON.parse(ap.properties.stv);
        return stvs.find(s => this.data[s].visible);
      } catch (e) {
        console.error('Hover error', e);
      }
    }
    return null;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
