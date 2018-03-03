import { computed } from 'mobx';

export default class GeometryModel {
  id = 0;
  geometry = {};

  @computed get projected() {
    // listen for projection name
    // otherwise geometry will be not projected
    // after projection change
    if (this.rootStore.projection.version < 0) return false;
    return this.rootStore.projection.path(this.geometry);
  }

  constructor(rootStore, geometry) {
    this.rootStore = rootStore;
    this.id = geometry.id;
    if (typeof geometry.geometry !== 'undefined') {
      // Border
      this.geometry = geometry.geometry;
    } else if (typeof geometry.contour !== 'undefined') {
      // Contour
      this.geometry = geometry.contour;
    } else {
      console.log('Strange input to Geometry model', geometry);
    }
  }
}
