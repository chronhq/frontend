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
  computed, action, when
} from 'mobx';

export default class CourseSideEffects {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  find(name) {
    return Object
      .values(this.rootStore.data.narratives.data)
      .find(cur => cur.url === name);
  }

  @computed get deps() {
    return this.rootStore.data.camelDeps;
  }

  @computed get courseId() {
    return this.rootStore.flags.runtime.get('SelectedCourse');
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

  @computed get courseInfo() {
    return this.rootStore.data.narratives.data[this.courseId];
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
    this.rootStore.pins.wipeDummyPins();
  }

  @action configureDataFilters() {
    const filter = `?narrative=${this.courseId}`;
    this.rootStore.data.narrations.filter = filter;
    this.rootStore.data.mapSettings.filter = filter;
  }

  @action updateCD() {
    const filter = `?year=${this.rootStore.year.now}&has_location=false`;
    this.rootStore.data.cachedData.filter = filter;
    this.rootStore.data.cachedData.wipe();
    if (this.courseId === 0) {
      this.rootStore.data.cachedData.get();
      // when(
      //   () => this.rootStore.data.cachedData.status.loaded,
      //   () => {
      //     const wIds = Object.values(this.rootStore.data.cachedData.data)
      //       .map(c => c.wikidata_id);
      //     this.rootStore.wikidata.getItems(wIds);
      //   }
      // );
    }
  }

  @action loadBaseData() {
    this.rootStore.data.resolveDependencies(this.deps.base);
  }

  @action loadCourseData() {
    // Load Course Specific data
    this.rootStore.data.resolveDependencies(this.listOfDeps);
  }

  @action select(id, name, fake = null) {
    if (id === this.courseId && fake !== null) {
      console.log('Course already selected', id, name);
      return null;
    }
    // case for 'about us' page
    if (id >= 0 && this.rootStore.data.narratives.data[-1] !== undefined) {
      delete this.rootStore.data.narratives.data[-1];
    }

    this.rootStore.flags.set({
      runtime: {
        SelectedCourse: id,
        SelectedCourseName: name,
      }
    });

    this.rootStore.year.setup({
      min: this.courseInfo.start_year,
      max: this.courseInfo.end_year,
      now: this.courseInfo.start_year,
      tick: 0,
    });


    this.rootStore.dashboard.setup();

    this.configureDataFilters();
    this.loadCourseData();

    this.rootStore.flags.set({
      projection: this.rootStore.flags.defaultFlags.projection
    });

    when(
      () => (
        fake !== null || id === 0 // for global narrative and fake pages
        || (this.rootStore.data.mapSettings.status.loaded
        && this.rootStore.data.narrations.status.loaded)),
      () => {
        if (this.courseInfo.mapSettings !== undefined) {
          // Fake courses or Global Narrative
          this.rootStore.deck.updateSettings(this.courseInfo.mapSettings);
        }
        this.rootStore.year.setTick(0);
        this.updateCD();
      }
    );

    return true;
  }
}
