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
import SpaceTimeVolume from './SpaceTimeVolumes/SpaceTimeVolumeModel';
import fakeNarrativeBuilder from '../FakeNarrativeBuilder';

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
const camelCase = string => string.trim()
  .split('-').map((s, idx) => ((idx === 0) ? s : capitalizeFirstLetter(s))).join('');

export default class DataModel {
  @observable deps = {
    special: [
      'narratives'
    ],
    base: [
      'spacetime-volumes', // would be translated into 'spacetimeVolumes' model
      'territorial-entities', // territorialEntities
    ],
    course: [
      'narrations'
    ],
    world: [
    ],
    heavy: [
    ]
  };

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

  constructor(rootStore) {
    Object.keys(this.roster).map((url) => {
      const model = this.roster[url];
      this[model] = new DataLoaderModel(url);
      return false;
    });

    this.narrations.sortId = 'order';

    this.narratives.configure({
      append: true,
      wrapData: d => fakeNarrativeBuilder({ ...d, url: d.id }),
    });

    this.narratives.data[0] = fakeNarrativeBuilder({
      url: 'world',
      id: 0,
      title: 'Global Narrative',
      author: ''
    });

    this.spacetimeVolumes.configure({
      sortId: 'id',
      append: false,
      arrayCb: false,
      wrapData: d => new SpaceTimeVolume(rootStore, d.id, d),
    });
  }

  @action resolveDependencies(depend) {
    return depend.map((model) => {
      this[camelCase(model)].downloadModel();
      return false;
    });
  }
}
