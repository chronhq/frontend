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
  computed, observable
} from 'mobx';

export default class BordersModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.rootStore.data;
  }

  @observable layerName = 'ap';

  @computed get STVs() {
    return this.rootStore.spaceTimeVolume;
  }

  @computed get styleFeatures() {
    console.time('StyleFeatures');
    // `rgb(${stv.color})`
    const res = Object.values(this.STVs.current).reduce((prev, stv) => ({
      ids: [...prev.ids, ...stv.data.territory].map(m => Number(m)),
      // ids: Object.keys(this.STVs.active).map(m => Number(m)),
      fill: [...prev.fill, stv.data.territory, `rgb(${[133, 20, 17]})`]
    }), { ids: [], fill: [] });
    console.timeEnd('StyleFeatures');
    return res;
  }

  @computed get polyCount() {
    return this.styleFeatures.ids.reduce((p, c) => ({
      ...p,
      [c]: (p[c] !== undefined ? p[c] + 1 : 1)
    }), {});
  }

  @computed get overlap() {
    return Object.keys(this.polyCount).reduce((prev, cur) => (
      this.polyCount[cur] !== 1 ? { ...prev, [cur]: this.polyCount[cur] } : prev), {});
  }

  @computed get fill() {
    return Object.values(this.STVs.current).reduce((prev, stv) => {
      const territory = stv.data.territory.filter(f => (this.overlap[f] !== undefined));
      if (territory.length !== 0) {
        return [
          ...prev,
          territory.map(m => Number(m)),
          `rgb(${[133, 20, 17]})`
          // `rgb(${stv.color})`
        ];
      }
      return prev;
    }, []);
  }

  @computed get redPolys() {
    // combine polys by frequency
    return Object.keys(this.overlap).reduce((p, c) => (
      {
        ...p,
        [this.overlap[c]]: (
          p[this.overlap[c]] !== undefined
            ? [...p[this.overlap[c]], c]
            : [c])
      }), {});
  }

  @computed get failed() {
    const colors = [[255, 77, 0], [255, 36, 0], [255, 0, 0], [139, 0, 0], [128, 0, 0]];
    return Object.keys(this.redPolys).reduce((prev, r) => {
      let color = 0;
      if (r === 3) color = 1;
      if (r === 4) color = 2;
      if (r === 5) color = 3;
      if (r > 5) color = 4;
      return [...prev, this.redPolys[r].map(m => Number(m)), `rgb(${colors[color]})`];
    }, []);
  }

  @computed get styleFeaturesDebug() {
    // console.time('StyleFeaturesDebug');
    // console.timeEnd('StyleFeaturesDebug');
    return {
      ids: Object.keys(this.overlap).map(m => Number(m)), fill: this.failed
    };
    // return {
    //   ids: Object.keys(this.STVs.active).map(m => Number(m)),
    //   fill
    //   // fill: [
    //   //   // ...this.fill,
    //   //   // ...this.failed
    //   // ]
    // };
  }

  @computed get styleInfo() {
    const name = this.layerName;

    const mapsOpacity = 0.75;

    const source = {
      type: 'vector',
      tiles: [`${window.location.origin}/mvt/${name}/{z}/{x}/{y}`]
    };

    // transparent fallback color
    // const fallback = 'hsla(0, 14%, 87%, 0)';
    const fallback = 'rgb(0, 255, 0)';

    const layer = {
      layout: {},
      filter: ['in', 'id', ...this.styleFeaturesDebug.ids],
      // filter: ['in', 'id', ...arr],
      type: 'fill',
      source: name,
      id: name,
      paint: {
        'fill-opacity': mapsOpacity,
        'fill-color': ['match', ['get', 'id'], ...this.styleFeaturesDebug.fill, fallback],
        // 'fill-color': ['match', ['get', 'id'], arr, 'rgb(100, 100, 255)', fallback],
        // 'fill-outline-color': 'hsl(0, 40%, 67%)',
        'fill-outline-color': 'rgb(30, 30, 200)',
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
