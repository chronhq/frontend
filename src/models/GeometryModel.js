import { computed } from 'mobx';

export default class GeometryModel {
  id = 0;
  geometry = {};

  @computed get projected() {
    return this.path(this.geometry);
  }

  constructor(rootStore, geometry) {
    this.path = rootStore.projection.path;
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
