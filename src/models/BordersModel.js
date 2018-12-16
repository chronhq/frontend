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
  computed
} from 'mobx';

function getActualData(years, data, target) {
  if (typeof (years) === 'undefined') {
    return [];
  }
  const res = Math.max(...years.filter(y => y <= target));
  if (Number.isFinite(res)) {
    return data[res];
  }
  return [];
}

export default class BordersModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.rootStore.data;
  }

  @computed get actualData() {
    const data = getActualData(
      this.allYears,
      this.byYear,
      this.rootStore.year.now
    );
    if (Array.isArray(data)) {
      return data;
    }
    return data.geoProps;
  }

  @computed get byYear() {
    return this.rootStore.data.Borders.data;
  }

  @computed get geomBBoxes() {
    return this.rootStore.data.GeomBBoxes.data;
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }

  @computed get styleFeatures() {
    const properties = this.rootStore.properties.data;
    return Object.keys(this.actualData).map(geo => ({
      color: (this.actualData[geo] in properties
        ? properties[this.actualData[geo]].color
        : [0, 0, 0]),
      id: Number(geo),
      props: this.actualData[geo],
    }));
  }

  @computed get styleInfo() {
    const name = 'collection';

    const mapsOpacity = 0.25;

    const source = {
      type: 'vector',
      tiles: [`${window.location.origin}/mvt/${name}/{z}/{x}/{y}`]
    };

    const ids = this.styleFeatures.map(cur => cur.id);
    const fill = this.styleFeatures.reduce((prev, cur) => ([
      ...prev,
      [cur.id],
      `rgb(${cur.color})`
    ]), []);
    // transparent fallback color
    const fallback = 'hsla(0, 14%, 87%, 0)';
    const layer = {
      layout: {},
      filter: ['in', 'id', ...ids],
      type: 'fill',
      source: name,
      id: name,
      paint: {
        'fill-opacity': mapsOpacity,
        'fill-color': ['match', ['get', 'id'], ...fill, fallback]
      },
      'source-layer': name
    };
    return {
      sources: { [name]: source }, layers: [layer]
    };
  }

  @computed get style() {
    return {
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
      ...this.styleInfo,
      center: [0, 0],
      zoom: 1,
      bearing: 0,
      pitch: 0,
    };
  }
}
