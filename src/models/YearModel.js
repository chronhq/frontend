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
import julian from 'julian';

const julianInt = date => Math.round(Number(julian(date)));
const yearToJulian = (year) => {
  // Date in ISO would be treated as UTC date
  const date = new Date('2000-01-01');
  // B.C. dates can not be set via ISO string
  date.setUTCFullYear(year);
  return julianInt(date);
};

export default class YearModel {
  @observable step = {
    year: 1,
    month: 0,
    week: 0,
    day: 0,
  };

  @observable min;

  @observable max;

  @observable now;

  @observable prev;

  @observable tick;

  // for UI interface and 'year' sliders
  @observable tuneValue;

  // Last day in current period (Dec 31)
  @computed get end() {
    return this.getDateByStep(true) - 1;
  }

  @computed get tuneValueG() {
    return julian.toDate(this.tuneValue).getUTCFullYear();
  }

  @computed get limits() {
    return {
      min: julian.toDate(this.min).getUTCFullYear(),
      max: julian.toDate(this.max).getUTCFullYear()
    };
  }

  @computed get year() {
    return julian.toDate(this.now).getUTCFullYear();
  }

  @computed get tuneIsValid() {
    return (this.tuneValue >= this.min && this.tuneValue <= this.max);
  }

  @computed get narrations() {
    return this.rootStore.data.narrations.data;
  }

  @computed get maxTick() {
    return Math.max(...Object.keys(this.narrations));
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action setup(year) {
    this.min = yearToJulian(year.min);
    this.max = yearToJulian(year.max);
    this.now = yearToJulian(year.now);
    this.tuneValue = this.now;
    this.prev = this.now;
    this.tick = year.tick;
  }

  @action setTuneValue(year) {
    this.tuneValue = yearToJulian(year);
  }

  @action setYear(year) {
    this.setDate(yearToJulian(year));
  }

  @action setDate(year) {
    this.prev = this.now;
    this.now = (year > this.max || year < this.min)
      ? this.min
      : year;
    this.rootStore.courseSelection.updateCD();
    this.tuneValue = this.now;
  }

  @action followWheel(deltaY) {
    if (deltaY > 1) {
      if (this.tuneValue < this.max) {
        this.setTuneValue(this.tuneValueG + 1);
      }
    } else if (deltaY < 1) {
      if (this.tuneValue > this.min) {
        this.setTuneValue(this.tuneValueG - 1);
      }
    }
  }

  saveTuneValue() {
    this.setDate(this.tuneValue);
  }

  resetTuneValue() {
    if (this.tuneValue !== this.now) this.setDate(this.now);
  }

  getDateByStep(next = true, c = 1) {
    const m = next ? 1 * c : -1 * c;
    const date = julian.toDate(this.now);
    date.setUTCFullYear(
      date.getUTCFullYear() + m * this.step.year,
      date.getUTCMonth() + m * this.step.month,
      date.getUTCDate() + (m * (this.step.day + this.step.week * 7))
    );
    return julianInt(date);
  }

  nextYear() {
    this.setDate(this.getDateByStep(true));
  }

  prevYear() {
    this.setDate(this.getDateByStep(false));
  }

  resetDate() {
    this.setDate(this.min);
  }

  @action setTick(tick) {
    if (tick in this.narrations) {
      const narration = this.narrations[tick];
      if (narration.settings) {
        const mapSetting = this.rootStore.data.mapSettings.data[narration.settings];
        this.rootStore.deck.updateSettings(mapSetting);
      }
      const date = new Date(narration.map_datetime);
      this.setDate(julianInt(date));
      this.tick = tick;
      // Fetch free data for free pins
      this.rootStore.wikidata.getItems(this.rootStore.pins.narrationFreeDeps);
      if (this.maxTick === tick && this.rootStore.courseSelection.courseId > 0) {
        this.rootStore.analytics.metricHit('narrative_completed');
      }
    }
  }

  nextTick() {
    this.setTick(this.tick + 1);
  }

  prevTick() {
    this.setTick(this.tick - 1);
  }
}
