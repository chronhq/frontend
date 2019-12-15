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

import settings from '../../../settings.json';

import citiesStyle from './CitiesMVTStyle';
import pinsStyle from './PinsMVTStyle';
import decorStyle from './DecorGJStyle';
import legacyPinsStyle from './PinsGJStyle';

import stvBorders from './STVBordersStyle';
import visualCenterMVT from './VisualCenterMVTStyle';
import symbolsMVT from './SymbolsMVTStyle';

import getSources from './MVTSources';

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
  @observable atomicBorders;

  @observable desiredMapBoxStyle;

  @observable installedMapBoxStyle;

  @observable accessToken = settings.mapbox.token;

  @observable backgroundStyle = { ...BODY, sources: {}, layers: [] };

  @computed get bordersStyle() {
    // Remove layer from style is faster than change visibility property
    return this.rootStore.flags.layer.borders.value
      ? stvBorders(this.rootStore.year.now, true)
      : [];
  }

  // @computed get pinsGJ() {
  //   return legacyPinsStyle(this.rootStore.pins.pins, 'pinsGJ');
  // }

  @computed get legacyPins() {
    const pins = ['dummyPinsGJ'];
    if (this.rootStore.year.tick === -1) {
      pins.push('narrativeOverview');
    }
    return legacyPinsStyle(pins);
  }

  @computed get decor() {
    return decorStyle(this.rootStore.i18n.lng);
  }

  @computed get cities() {
    return citiesStyle(this.rootStore.year.now, this.rootStore.flags.layer.list);
  }

  @computed get pins() {
    const { now, tick } = this.rootStore.year;
    const next = this.rootStore.year.getDateByStep();
    const { courseId } = this.rootStore.courseSelection;
    const narrations = this.rootStore.data.narrations.data;
    const wIds = (courseId > 0 && narrations[tick] !== undefined)
      ? narrations[tick].attached_events.map((e) => e.wikidata_id)
      : [];

    return pinsStyle(
      now,
      next,
      this.rootStore.flags.pins.list,
      courseId,
      wIds.length > 0 ? wIds : null,
    );
  }

  @computed get visualCenter() {
    return visualCenterMVT(this.rootStore.year.now);
  }

  @computed get symbols() {
    return this.rootStore.courseSelection.courseId > 0
      ? symbolsMVT(this.rootStore.courseSelection.courseId, this.rootStore.year.tick)
      : [];
  }

  @computed get style() {
    const staticSources = getSources({
      dummyPinsGJ: this.rootStore.pins.dummyPinsGJ,
      narrativeOverview: this.rootStore.pins.narrativeOverview
    });
    const sources = (typeof this.backgroundStyle.sources !== 'undefined')
      ? {
        ...this.backgroundStyle.sources,
        ...staticSources,
      }
      : staticSources;

    const generatedLayers = [
      ...this.decor,
      ...this.bordersStyle,
      ...this.visualCenter,
      ...this.cities,
      ...this.symbols,
      ...this.legacyPins,
      ...this.pins,
    ];

    const layers = (typeof this.backgroundStyle.layers !== 'undefined')
      ? [
        ...this.backgroundStyle.layers,
        ...generatedLayers,
      ]
      : generatedLayers;

    return {
      glyphs: '',
      ...this.backgroundStyle,
      sources,
      layers,
      sprite: `${window.location.origin}/sprite`,
      name: 'chronmaps',
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

  @action async setUpConfig(config = settings.mapbox) {
    this.accessToken = config.token;
    this.setUpBackground(config.style);
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
    this.setUpConfig();
  }
}
