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
  observable,
  computed,
  action
} from 'mobx';

const INITIAL_VIEW_STATE = {
  latitude: 0,
  longitude: 0,
  zoom: 1,
  bearing: 0,
  pitch: 0
};

export default class DeckViewportModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable transition = 1000;

  @observable width = window.innerWidth;

  @observable height = window.innerHeight;

  @computed get clipEnabled() {
    return this.rootStore.projection.clipEnabled === true;
  }

  @computed get viewport() {
    const zoom = this.rootStore.flags.zoom.list;
    const center = this.rootStore.projection.data.center !== undefined
      ? {
        longitude: this.rootStore.projection.data.center[0],
        latitude: this.rootStore.projection.data.center[1],
      }
      : {};
    const { minZoom, maxZoom } = zoom;
    const vState = {
      width: this.width,
      height: this.height,
      viewState: {
        ...INITIAL_VIEW_STATE,
        ...center,
        zoom: minZoom,
        minZoom,
        maxZoom,
      },
    };
    return vState;
  }

  @observable longitude = this.viewport.longitude;

  @observable latitude = this.viewport.latitude;

  @observable zoom = this.viewport.zoom;

  @observable interactiveMap = null;

  @observable loadingStatus = false;

  @observable flyToEnabled = true;

  @computed get validZoomValue() {
    // Do not reset zoom if current value is in range
    const { minZoom, maxZoom } = this.rootStore.flags.zoom.list;
    const { zoom } = this.viewState;
    return (maxZoom >= zoom && minZoom <= zoom)
      ? zoom // Keep current zoom if in range
      : this.viewport.zoom;
  }

  @computed get viewState() {
    const { minZoom, maxZoom } = this.rootStore.flags.zoom.list;
    return {
      width: this.width,
      height: this.height,
      longitude: this.longitude,
      latitude: this.latitude,
      zoom: this.zoom,
      pitch: 0,
      bearing: 0,
      minZoom,
      maxZoom,
    };
  }

  set viewState(viewState) {
    Object.keys(viewState).map((field) => {
      this[field] = viewState[field];
      return 0;
    });
  }

  @action watchLoading() {
    if (this.interactiveMap !== null) {
      this.loadingStatus = this.interactiveMap.getMap().loaded();
      if (typeof this.loadingStatus !== 'undefined') {
        setTimeout(() => this.watchLoading(), 300);
      }
    }
  }

  @action updateViewState(viewState) {
    this.viewState = viewState;
  }

  @action toggleFlyTo() {
    this.flyToEnabled = !this.flyToEnabled;
  }

  @action initLatLon() {
    const center = this.flyToEnabled
      ? [
        this.viewport.viewState.longitude,
        this.viewport.viewState.latitude
      ]
      : [
        this.viewState.longitude,
        this.viewState.latitude
      ];

    if (this.interactiveMap !== null) {
      const map = this.interactiveMap.getMap();
      map.flyTo({
        center,
        zoom: this.validZoomValue,
      });
    }
    setTimeout(() => {
      if (this.flyToEnabled === true) {
        this.longitude = this.viewport.viewState.longitude;
        this.latitude = this.viewport.viewState.latitude;
      }
      this.zoom = this.validZoomValue;
    }, (this.interactiveMap !== null
      || (this.flyToEnabled !== true && this.zoom !== this.validZoomValue))
      ? this.transition : 0);
  }

  @action updateSettings(mapSettings) {
    if (mapSettings === undefined) {
      console.error('Undefined Map Settings');
      return;
    }
    const center = [
      (mapSettings.bbox.coordinates[1][0] + mapSettings.bbox.coordinates[0][0]) / 2,
      (mapSettings.bbox.coordinates[1][1] + mapSettings.bbox.coordinates[0][1]) / 2,
    ];
    this.rootStore.flags.set({
      zoom: {
        minZoom: mapSettings.zoom_min,
        maxZoom: mapSettings.zoom_max,
      },
      projection: {
        clip: [[-180, 90], [180, -90]],
        center
      },
    });
    // update viewport position
    this.initLatLon();
  }
}
