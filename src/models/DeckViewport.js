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
  pitch: 0,
  maxZoom: 5,
  minZoom: 0.5
};

export default class DeckViewportModel {
  @computed get view() {
    return new MapView({
      id: 'id-view',
      width: window.innerWidth,
      height: window.innerHeight,
      controller: { type: MapController, dragRotate: false }
    });
  }

  @computed get clipArray() {
    // if (this.rootStore.flags.flags.runtime.SelectedCourse === 0) {
    // if (false) {
      return [[110, 65], [170, 35]];
    // }
    // return [[-179, 89], [179, -85]];
    // return null;
  }

  @computed get viewport() {
    return this.view.makeViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      viewState: INITIAL_VIEW_STATE
    }).fitBounds(this.clipArray);
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

  @observable longitude = this.viewport.longitude + this.offsetDegree[0];

  @observable latitude = this.viewport.latitude + this.offsetDegree[1];

  @observable zoom = this.viewport.zoom;

  @observable pitch = 0;

  @observable bearing = 0;

  @observable maxZoom = 5;

  @observable minZoom = 0.5;

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
