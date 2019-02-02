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
import { computed, action, observable } from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable fakeId = null;

  find(name) {
    return Object
      .values(this.rootStore.data.Courses.data)
      .find(cur => cur.url === name);
  }

  @computed get deps() {
    return this.rootStore.data.deps;
  }

  @computed get courseId() {
    return this.rootStore.flags.runtime.get('SelectedCourse');
  }

  @computed get bordersCourseId() {
    return this.fakeId === null ? this.courseId : this.fakeId;
  }

  @computed get listOfDeps() {
    switch (this.courseId) {
      case -1: return this.deps.base;
      case 0: return [...this.deps.base, ...this.deps.world];
      default: return [...this.deps.base, ...this.deps.course];
    }
  }


  @computed get loadingIsComplete() {
    return this.listOfDeps.every(d => this.rootStore.data[d].status.loaded);
  }

  @computed get courseFilter() {
    return JSON.stringify({
      where: {
        courseId: this.courseId
      }
    });
  }

  @computed get bordersCourseFilter() {
    return JSON.stringify({
      where: {
        courseId: this.bordersCourseId
      }
    });
  }

  @computed get courseInfo() {
    return this.rootStore.data.Courses.data[this.courseId];
  }

  @action cleanup() {
    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: null,
      }
    });

    const wipe = d => this.rootStore.data[d].wipe();

    // Wipe data except base deps
    this.deps.course.map(wipe);
    this.deps.world.map(wipe);
    this.deps.heavy.map(wipe);
  }

  @action configureDataFilters() {
    this.rootStore.data.Borders.filter = this.bordersCourseFilter;
    this.rootStore.data.CourseTimelines.filter = this.courseFilter;
  }

  @action loadBaseData() {
    this.rootStore.data.resolveDependencies(this.deps.base);
  }

  @action loadCourseData() {
    // Load heavy data
    this.rootStore.data.Borders.get();
    // Load Course Specific data
    this.rootStore.data.resolveDependencies(this.listOfDeps);
  }

  @action select(id, name, fake = null) {
    if (id === this.courseId) {
      console.log('Course already selected', id, name);
      return null;
    }
    // case for 'about us' page
    if (id >= 0 && this.rootStore.data.Courses.data[-1] !== undefined) {
      delete this.rootStore.data.Courses.data[-1];
    }

    this.fakeId = fake;
    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: id,
        SelectedCourseName: name,
      }
    });

    this.rootStore.year.setup(this.courseInfo.config.year);
    this.rootStore.flags.set(this.courseInfo.config.settings.flags);

    this.rootStore.dashboard.setup();

    this.configureDataFilters();
    this.loadCourseData();

    // update viewport position
    this.rootStore.deck.initLatLon();
    return true;
  }
}
