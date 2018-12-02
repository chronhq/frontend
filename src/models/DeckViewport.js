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

import {
  MapView,
  MapController
} from '@deck.gl/core';

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

  @observable width = window.innerWidth;

  @observable height = window.innerHeight;

  @observable showCluster = true;

  @computed get view() {
    return new MapView({
      id: 'id-view',
      width: this.width,
      height: this.height,
      controller: { type: MapController, dragRotate: false }
    });
  }

  @computed get sizeScale() {
    return this.showCluster
      ? 1 * window.devicePixelRatio
      : Math.min(1.5 ** (this.zoom - 10), 1) * window.devicePixelRatio;
  }

  @computed get clipEnabled() {
    return this.rootStore.projection.clipEnabled === true;
  }

  @computed get viewport() {
    const zoom = this.rootStore.flags.zoom.list;
    const vState = {
      width: this.width,
      height: this.height,
      viewState: {
        ...INITIAL_VIEW_STATE,
        maxZoom: zoom.maxScale,
        minZoom: zoom.minScale,
      },
    };

    if (this.clipEnabled) {
      return this.view.makeViewport(vState)
        .fitBounds(this.rootStore.projection.clip);
    }
    return this.view.makeViewport(vState);
  }

  @computed get offsetDegree() {
    const topLeft = this.rootStore.projection.data.clip[0];
    const [offsetXpixels, offsetYpixels] = this.viewport.project(topLeft);
    let offsetXdegree = 0;
    let offsetYdegree = 0;
    if (this.clipEnabled) {
      offsetXdegree = offsetXpixels * this.viewport.distanceScales.degreesPerPixel[0];
      offsetYdegree = offsetYpixels * this.viewport.distanceScales.degreesPerPixel[1];
    }
    return [offsetXdegree, offsetYdegree];
  }

  @computed get metersPerPixel() {
    const vState = {
      width: this.width,
      height: this.height,
      viewState: this.viewState,
    };
    const viewport = this.clipEnabled
      ? this.view.makeViewport(vState)
        .fitBounds(this.rootStore.projection.clip)
      : this.view.makeViewport(vState);
    return viewport.distanceScales.metersPerPixel[0];
  }

  @observable longitude = this.viewport.longitude + this.offsetDegree[0];

  @observable latitude = this.viewport.latitude + this.offsetDegree[1];

  @observable zoom = this.viewport.zoom;

  @observable pitch = 0;

  @observable bearing = 0;

  @observable interactiveMap = null;

  @observable loadingStatus = false;

  @computed get maxZoom() {
    return this.rootStore.flags.zoom.get('maxScale');
  }

  set maxZoom(z) {
    this.rootStore.flags.zoom.set('maxScale', z);
  }

  @computed get minZoom() {
    return this.rootStore.flags.zoom.get('minScale');
  }

  set minZoom(z) {
    this.rootStore.flags.zoom.set('minScale', z);
  }

  @computed get rZoom() {
    return Math.floor(this.zoom);
  }

  @computed get viewState() {
    return {
      longitude: this.longitude,
      latitude: this.latitude,
      zoom: this.zoom,
      pitch: this.pitch,
      bearing: this.bearing,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom
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

  @action initLatLon() {
    this.longitude = this.viewport.longitude + this.offsetDegree[0];
    this.latitude = this.viewport.latitude + this.offsetDegree[1];
    this.zoom = this.viewport.zoom;
  }
}
