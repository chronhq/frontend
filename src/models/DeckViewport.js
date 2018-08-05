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

  @observable width = window.innerWidth;

  @observable height = window.innerHeight;


  @computed get enabled() {
    return this.rootStore.projection.enabled;
  }

  @computed get view() {
    // if (!this.enabled) return null;
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
      return this.view.makeViewport(vState)
        .fitBounds(this.rootStore.projection.clip);
    }
    return this.view.makeViewport(vState);
  }

  @computed get offsetDegree() {
    const [offsetXpixels, offsetYpixels] = this.viewport.project([110, 65]);
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

  @computed get maxZoom() {
    return this.rootStore.flags.flags.zoom.maxScale;
  }

  set maxZoom(z) {
    this.rootStore.flags.flags.zoom.maxScale = z;
  }

  @computed get minZoom() {
    return this.rootStore.flags.flags.zoom.minScale;
  }

  set minZoom(z) {
    this.rootStore.flags.flags.zoom.minScale = z;
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

  @action updateViewState(viewState) {
    this.viewState = viewState;
  }
}
