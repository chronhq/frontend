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
import { observable, action, computed } from 'mobx';

export default class YearModel {
  @observable min;

  @observable max;

  @observable now;

  @observable prev;

  @observable tick;

  // for UI interface and 'year' sliders
  @observable tuneValue;

  @observable playing = false;

  @computed get tuneIsValid() {
    return (this.tuneValue >= this.min && this.tuneValue <= this.max);
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setup(year) {
    this.min = year.min;
    this.max = year.max;
    this.now = year.now;
    this.tuneValue = year.now;
    this.prev = year.now;
    this.tick = year.tick;
  }

  @action setTuneValue(year) {
    this.tuneValue = year;
  }

  @action setYear(year) {
    this.prev = this.now;
    this.now = (year > this.max || year < this.min)
      ? this.min
      : year;
    this.setTuneValue(this.now);
  }

  @action followWheel(deltaY) {
    if (deltaY > 1) {
      if (this.tuneValue < this.max) {
        this.setTuneValue(this.tuneValue + 1);
      }
    } else if (deltaY < 1) {
      if (this.tuneValue > this.min) {
        this.setTuneValue(this.tuneValue - 1);
      }
    }
  }

  saveTuneValue() {
    this.setYear(this.tuneValue);
  }

  resetTuneValue() {
    this.setYear(this.now);
  }

  nextYear() {
    this.setYear(this.now + 1);
  }

  prevYear() {
    this.setYear(this.now - 1);
  }

  resetYear() {
    this.setYear(this.min);
  }

  @action setTick(tick) {
    if (tick in this.rootStore.data.CourseTimelines.data) {
      this.setYear(this.rootStore.data.CourseTimelines.data[tick].year);
      this.tick = tick;
    }
  }

  nextTick() {
    this.setTick(this.tick + 1);
  }

  prevTick() {
    this.setTick(this.tick - 1);
  }
}
