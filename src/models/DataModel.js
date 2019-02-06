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
import TraceModel from './DataAdaptation/TraceModel';
import PointModel from './DataAdaptation/PointModel';
import SpaceTimeVolume from './SpaceTimeVolumes/SpaceTimeVolumeModel';

export default class DataModel {
  @observable activeCourses = JSON.stringify({ where: { active: true } });

  @observable deps = {
    special: [
      'Courses'
    ],
    base: [
      'CityLocs',
      'CityPops',
      'CityProperties',
      'MapLabels',
      'Persons',
      'MapDecorations',
      'STVs',
      'TEs',
    ],
    course: [
      'CourseTimelines',
      'CourseTraces',
      'CourseGeopoints',
    ],
    world: [
    ],
    heavy: [
    ]
  };

  @computed get roster() {
    return Object.keys(this.deps)
      .reduce((prev, cur) => ([...prev, ...this.deps[cur]]), []);
  }

  constructor(rootStore) {
    this.roster.map((model) => {
      this[model] = new DataLoaderModel(model);
      return false;
    });

    this.Courses.filter = this.activeCourses;
    this.CourseTimelines.sortId = 'tick';

    this.CourseGeopoints.configure({
      sortId: 'courseTimelineId',
      append: true,
      arrayCb: true,
      wrapData: d => new PointModel(d),
    });

    this.CourseTraces.configure({
      sortId: 'courseTimelineId',
      append: true,
      arrayCb: true,
      wrapData: d => new TraceModel(d),
    });

    this.STVs.configure({
      sortId: 'id',
      append: false,
      arrayCb: false,
      wrapData: d => new SpaceTimeVolume(rootStore, d.id, d),
    });
  }

  @action resolveDependencies(depend) {
    return depend.map((model) => {
      this[model].downloadModel();
      return false;
    });
  }
}
