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
import { observable, computed } from 'mobx';
import Locations from './DataAdaptation/LocationsModel';
import Persons from './DataAdaptation/PersonsList';
import Inventions from './DataAdaptation/InventionsList';
import GeoEvents from './DataAdaptation/GeoEventsList';
import Decor from './DataAdaptation/Decor';

export default class FinalDataModel {
  @observable data = {};

  @observable persons;

  @observable inventions;

  @observable geoEventsList;

  @computed get locations() {
    return this.data.cities.locations;
  }

  @computed get clusteredLocations() {
    return this.data.cities.clusteredLocations;
  }

  @computed get geoPoints() {
    const geoPoints = this.rootStore.data.CourseGeopoints.data;
    return this.rootStore.year.tick in geoPoints
      ? geoPoints[this.rootStore.year.tick]
      : [];
  }

  @computed get expeditions() {
    return this.rootStore.year.tick in this.rootStore.data.CourseTraces.data
      ? this.rootStore.data.CourseTraces.data[this.rootStore.year.tick]
      : [];
  }

  @computed get decor() {
    return this.data.decor;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data.decor = new Decor(rootStore);
    this.data.cities = new Locations(rootStore);

    this.persons = new Persons(rootStore);
    this.inventions = new Inventions(rootStore);
    this.geoEventsList = new GeoEvents(rootStore);
  }
}
