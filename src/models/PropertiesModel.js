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
import {
  observable, computed
} from 'mobx';

const rgbaToHsla = (rgba) => {
  const [r, g, b, a] = rgba.map(c => c / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const hsl = {};
  const diff = max - min;
  const sum = max + min;
  hsl.l = (max + min) / 2;

  if (diff === 0) {
    hsl.h = 0;
    hsl.s = 0;
  } else {
    hsl.s = hsl.l > 0.5
      ? diff / (2 - diff)
      : diff / (sum);
    switch (max) {
      case r: hsl.h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: hsl.h = (b - r) / diff + 2; break;
      case b: hsl.h = (r - g) / diff + 4; break;
      default: break;
    }
    hsl.h /= 6;
  }
  return [`${hsl.h * 360}`, `${hsl.s * 100}%`, `${hsl.l * 100}%`, a];
};

class Property {
  @observable id;

  @computed get data() {
    return this.rootStore.data.Properties.data[this.id];
  }

  @computed get admin() {
    return this.rootStore.data.Admins.data[this.data.admin];
  }

  @computed get type() {
    return this.rootStore.data.Types.data[this.data.type];
  }

  @computed get color() {
    const colors = this.rootStore.data.MapColors.data;
    // MapOpacity range from 0 to 255;
    // 64 from 255 is 25% for opacity
    const mapsOpacity = 64;
    try {
      const color = colors[this.data.color].color1;
      return rgbaToHsla([color[0], color[1], color[2], mapsOpacity]);
    } catch (e) {
      // console.error('ColorID', this.data.color, 'Props', this.data);
      // Probably colorID === -99 -- Disputed territory
      return rgbaToHsla([127, 127, 127, mapsOpacity]);
    }
  }

  constructor(rootStore, id) {
    this.rootStore = rootStore;
    this.id = id;
  }
}

export default class PropertiesModel {
  @computed get properties() {
    return this.rootStore.data.Properties.data;
  }

  @computed get data() {
    return Object.values(this.properties).reduce((prev, cur) => ({
      ...prev,
      [cur.id]: new Property(this.rootStore, cur.id)
    }), {});
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
