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
  computed, observable, action, runInAction
} from 'mobx';

import settings from '../../settings.json';

const BODY = {
  version: 8,
  name: 'maps',
  metadata: {
    'mapbox:autocomposite': true,
    'mapbox:type': 'template',
    'mapbox:sdk-support': {
      js: '0.49.0',
      android: '6.5.0',
      ios: '4.4.0'
    }
  },
  center: [0, 0],
  zoom: 1,
  bearing: 0,
  pitch: 0,
};

export default class MapStyleModel {
  @observable desiredMapBoxStyle;

  @observable installedMapBoxStyle;

  @observable accessToken = settings.mapbox.token;

  @observable backgroundStyle = { ...BODY, sources: {}, layers: [] };

  @computed get bordersStyle() {
    return this.rootStore.flags.layer.get('borders')
      ? this.rootStore.atomicBorders.styleInfo
      : { sources: {}, layers: [] };
  }

  @computed get style() {
    const sources = (typeof this.backgroundStyle.sources !== 'undefined')
      ? {
        // ...this.backgroundStyle.sources,
        ...this.bordersStyle.sources
      }
      : this.bordersStyle.sources;

    const layers = (typeof this.backgroundStyle.layers !== 'undefined')
      ? [
        // ...this.backgroundStyle.layers,
        ...this.bordersStyle.layers
      ]
      : this.bordersStyle.layers;

    return {
      ...this.backgroundStyle,
      sources,
      layers,
    };
  }

  @computed get styleInSync() {
    return this.desiredMapBoxStyle === this.installedMapBoxStyle;
  }

  @computed get backgroundLink() {
    const link = this.desiredMapBoxStyle
      .replace('mapbox://styles', 'https://api.mapbox.com/styles/v1');
    return `${link}?access_token=${this.accessToken}`;
  }

  @action async setUpBackground(styleLink) {
    this.desiredMapBoxStyle = styleLink;
    try {
      const response = await fetch(this.backgroundLink);
      const background = await response.json();

      if (background.version === 8) {
        runInAction(() => {
          this.backgroundStyle = background;
          this.installedMapBoxStyle = styleLink;
        });
      } else {
        const error = {
          message: JSON.stringify(background),
          name: 'MapStyleModel background style fetch failed',
        };
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.setUpBackground(settings.mapbox.style);
  }
}
