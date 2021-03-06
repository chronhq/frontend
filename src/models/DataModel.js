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
  observable, action, computed
} from 'mobx';

import DataLoaderModel from './DataLoaderModel';
import { buildNarrative, buildMapSettings } from '../FakeNarrativeBuilder';

const capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
const camelCase = (string) => string.trim()
  .split('-').map((s, idx) => ((idx === 0) ? s : capitalizeFirstLetter(s))).join('');

export default class DataModel {
  @observable deps = {
    special: [
      'narratives',
    ],
    base: [
    ],
    course: [
      'narrations',
      'map-settings', // mapSettings
    ],
    world: [
    ],
    heavy: [
      'cached-data',
      'mapcolorscheme',
      'territorial-entities',
      'spacetime-volumes',
    ]
  };

  @computed get camelDeps() {
    return Object.keys(this.deps).reduce((prev, cur) => ({
      ...prev,
      [cur]: this.deps[cur].map(camelCase)
    }), {});
  }

  @computed get roster() {
    // { dash-key: dashKey }
    return Object.keys(this.deps)
      .reduce((prev, cur) => ({
        ...prev,
        ...this.deps[cur].reduce((p, c) => ({
          ...p,
          [c]: camelCase(c)
        }), {})
      }), {});
  }

  constructor() {
    Object.keys(this.roster).map((url) => {
      const model = this.roster[url];
      this[model] = new DataLoaderModel(url);
      return false;
    });

    this.territorialEntities.append = true;

    this.narrations.sortId = 'order';

    this.narratives.configure({
      append: true,
    });

    const mapSettings = buildMapSettings({
      zoom_min: 1, zoom_max: 7.5, coordinates: [[0, 0], [0, 0]]
    });

    this.narratives.data[0] = buildNarrative({
      url: 'world',
      id: 0,
      title: 'Global Narrative',
      mapSettings,
    });
  }

  @action resolveDependencies(depend) {
    return depend.map((model) => {
      this[camelCase(model)].downloadModel();
      return false;
    });
  }
}
