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

  @observable transition = 500;

  @observable width = window.innerWidth;

  @observable height = window.innerHeight;

  @observable mapInitialized = false;

  @computed get viewport() {
    const { minZoom, maxZoom, center } = this.rootStore.flags.deck.list;

    const vState = {
      width: this.width,
      height: this.height,
      viewState: {
        ...INITIAL_VIEW_STATE,
        longitude: center[0],
        latitude: center[1],
        zoom: minZoom,
        minZoom,
        maxZoom,
      },
    };
    return vState;
  }

  @observable longitude = this.viewport.viewState.longitude;

  @observable latitude = this.viewport.viewState.latitude;

  @observable zoom = this.viewport.viewState.zoom;

  @observable interactiveMap = null;

  @observable loadingStatus = false;

  @observable flyToEnabled = true;

  @computed get validZoomValue() {
    // Do not reset zoom if current value is in range
    const { minZoom, maxZoom } = this.rootStore.flags.deck.list;
    const { zoom } = this.viewState;
    return (maxZoom >= zoom && minZoom <= zoom)
      ? zoom // Keep current zoom if in range
      : this.viewport.viewState.zoom;
  }

  @computed get viewState() {
    const { minZoom, maxZoom } = this.rootStore.flags.deck.list;
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

  @computed get center() {
    return [
      this.viewState.longitude,
      this.viewState.latitude
    ];
  }

  // Center from narration or map settings
  @computed get defaultCenter() {
    return this.rootStore.flags.deck.list.center;
  }

  set viewState(viewState) {
    Object.keys(viewState).map((field) => {
      this[field] = viewState[field];
      return 0;
    });
  }

  @action initialLoad(b) {
    this.mapInitialized = b;
    this.loadingStatus = b;
  }

  @action isLoaded(e) {
    this.loadingStatus = e.isSourceLoaded;
  }

  @action updateViewState(viewState) {
    this.viewState = viewState;
  }

  @action toggleFlyTo() {
    this.flyToEnabled = !this.flyToEnabled;
  }

  @action flyTo(center, zoom) {
    if (this.interactiveMap !== null) {
      const map = this.interactiveMap.getMap();
      map.flyTo({
        center,
        zoom,
      });
    }
  }

  @action moveCamera(center, zoom) {
    // console.log('Moving Camera to', center, zoom);
    this.flyTo(center, zoom);
    this.updatePosition(center, zoom);
  }

  @action updatePosition(center, zoom) {
    const [longitude, latitude] = Array.isArray(center) ? center : [0, 0];
    setTimeout(() => {
      if (this.flyToEnabled === true) {
        this.longitude = longitude;
        this.latitude = latitude;
      }
      this.zoom = zoom;
    }, (this.interactiveMap !== null
      || (this.flyToEnabled !== true && this.zoom !== this.validZoomValue))
      ? this.transition : 0);
  }

  @action zoomOut(out = true) {
    const m = out ? -1 : 1;
    let zoom = this.zoom + m;
    zoom = (zoom > this.maxZoom) ? this.maxZoom : zoom;
    zoom = (zoom < this.minZoom) ? this.minZoom : zoom;
    this.moveCamera(this.center, zoom);
  }

  @action updateSettings(mapSettings, center) {
    if (mapSettings === undefined) {
      console.error('Undefined Map Settings');
      return;
    }
    this.rootStore.flags.set({
      deck: {
        minZoom: mapSettings.zoom_min,
        maxZoom: mapSettings.zoom_max,
        center: center || this.defaultCenter
      },
    });
    // update viewport position
    this.moveCamera(
      this.flyToEnabled
        ? center || this.defaultCenter
        : this.defaultCenter,
      this.validZoomValue
    );
  }
}
