import { observable, computed, action } from 'mobx';

export default class DeckViewportModel {
  @observable longitude = 0;
  @observable latitude = 0;
  @observable zoom = 1;
  @observable pitch = 0;
  @observable bearing = 0;

  @computed get rZoom() {
    return Math.floor(this.zoom);
  }

  @computed get viewport() {
    return {
      longitude: this.longitude,
      latitude: this.latitude,
      zoom: this.zoom,
      pitch: this.pitch,
      bearing: this.bearing,
    };
  }

  set viewport(viewport) {
    Object.keys(viewport).map((field) => {
      this[field] = viewport[field];
      return 0;
    });
  }

  @action updateViewport(viewport) {
    this.viewport = viewport;
  }
}
