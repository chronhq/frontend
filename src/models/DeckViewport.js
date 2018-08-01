import {
  observable,
  computed,
  action
} from 'mobx';

import {
  MapView,
  MapController
} from 'deck.gl';

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

  @computed get enabled() {
    return this.rootStore.projection.enabled;
  }

  @computed get view() {
    // if (!this.enabled) return null;
    console.log('Building view');
    return new MapView({
      id: 'id-view',
      width: this.width,
      height: this.height,
      controller: { type: MapController, dragRotate: false }
    });
  }

  @computed get clipEnabled() {
    return this.rootStore.projection.clipEnabled === true;
  }

  @computed get viewport() {
    console.log('Building viewport');
    console.trace('viewport');
    // if (!this.enabled) return null;
    const vState = {
      width: this.width,
      height: this.height,
      viewState: {
        ...INITIAL_VIEW_STATE,
        maxZoom: this.rootStore.flags.flags.zoom.maxScale,
        minZoom: this.rootStore.flags.flags.zoom.minScale,
      },
    };
    if (this.clipEnabled) {
      console.log('fitBounds');
      console.log(JSON.stringify(this.rootStore.projection.data));
      return this.view.makeViewport(vState)
        .fitBounds(this.rootStore.projection.clip);
    }
    console.log('clip disabled');
    console.log(JSON.stringify(this.rootStore.projection.data));
    return this.view.makeViewport(vState);
  }

  @computed get offsetDegree() {
    const [offsetXpixels, offsetYpixels] = this.viewport.project([110, 35]);
    let offsetXdegree = 0;
    let offsetYdegree = 0;
    // if (this.rootStore.flags.flags.runtime.SelectedCourse =! 0) {
    if (false) {
      offsetXdegree = offsetXpixels * this.viewport.distanceScales.degreesPerPixel[0];
      offsetYdegree = offsetYpixels * this.viewport.distanceScales.degreesPerPixel[1];
    }
    return [offsetXdegree, offsetYdegree];
  }

  @computed get metersPerPixel() {
    return 40;
    // return this.viewport.distanceScales.metersPerPixel[0];
  }

  // @observable longitude = this.viewport.longitude + this.offsetDegree[0];
  @observable longitude = this.rootStore.projection.center[1];

  // @observable latitude = this.viewport.latitude + this.offsetDegree[1];
  @observable latitude = this.rootStore.projection.center[0];
  // @observable init = false;

  // @observable latitude = 0;

  // @observable longitude = 0;

  // @observable zoom = this.viewport.zoom;
  @observable zoom = this.rootStore.flags.flags.zoom.minScale;

  @observable pitch = 0;

  @observable bearing = 0;

  @observable maxZoom = 5;

  @observable minZoom = 1;

  @observable innerWidth = window.innerWidth;

  @observable innerHeight = window.innerHeight;

  @action setSize(w, h) {
    this.innerWidth = w;
    this.innerHeight = h;
  }

  // @action initViewport(force = false) {
  //   if (this.init === true || force === false) return false;
  //   this.longitude = this.viewport.longitude;
  //   this.latitude = this.viewport.latitude;
  //   this.zoom = this.viewport.zoom;
  //   this.init = true;
  //   return true;
  // }

  @computed get rZoom() {
    return Math.floor(this.zoom);
  }

  @computed get viewState() {
    console.log('Building viewstate');
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

  @action updateViewState(viewState) {
    this.viewState = viewState;
  }
}
