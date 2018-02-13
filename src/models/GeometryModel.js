import { observable, when, action, computed } from 'mobx';

export default class GeometryModel {
  @observable id;
  @observable geometry;
  @computed get projected() {
    return this.rootStore.projection.pathFn(this.geometry);
  }
  constructor(rootStore, geometry) {
    this.id = geometry.id;
    this.geometry = geometry.geometry;
  }
}
