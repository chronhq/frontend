import { computed, observable } from 'mobx';

export default class PointModel {
  @observable data = {};
  @observable type = '';

  @computed get projection() {
    return this.rootStore.projection;
  }

  @computed get visibility() {
    return this.rootStore.flags.flags.visibility;
  }

  @computed get project() {
    return this.projection.project;
  }

  @computed get projected() {
    return this.project([this.point.x, this.point.y]);
  }

  @computed get point() {
    if (this.type === 'Cities' || this.type === 'GeoEvents') {
      return {
        x: this.data.x,
        y: this.data.y,
      };
    }
    return {
      x: this.data.geopoint[0],
      y: this.data.geopoint[1],
    };
  }
  // Point will be in viewport area after clipping
  @computed get inTheBox() {
    return this.projection.inTheBox(this.point.x, this.point.y);
  }

  @computed get sizeIsOk() {
    return this.data.scalerank < this.visibility.scale;
  }

  @computed get visible() {
    return (this.sizeIsOk && this.inTheBox);
  }

  @computed get nameSelector() {
    return this.rootStore.i18n.nameSelector;
  }

  @computed get location() {
    return {
      id: this.data.id,
      x: this.projected[0],
      y: this.projected[1],
      name: this.data[this.nameSelector],
      scaleRank: this.data.scalerank,
    };
  }

  constructor(rootStore, point, type) {
    this.rootStore = rootStore;
    this.data = point;
    this.type = type;
  }
}
