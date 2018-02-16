import { computed, observable, toJS } from 'mobx';

export default class PointModel {
  @observable data = {};
  @observable type = '';

  @computed get project() {
    return this.projection.project;
  }

  @computed get projected() {
    return this.project([this.point.x, this.point.y]);
  }

  @computed get topLeft() {
    return this.projection.clip[0];
  }

  @computed get bottomRight() {
    return this.projection.clip[1];
  }

  @computed get point() {
    if (this.type === 'cities') {
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
    return (!(this.point.x < this.topLeft[0]
        || this.point.x > this.bottomRight[0]
        || this.point.y < this.bottomRight[1]
        || this.point.y > this.topLeft[1])
    );
  }
  @computed get sizeIsOk() {
    return this.data.scalerank < this.visibility.scale;
  }

  @computed get visible() {
    return (this.sizeIsOk && this.inTheBox);
  }

  @computed get location() {
    return {
      id: toJS(this.data.id),
      x: this.projected[0],
      y: this.projected[1],
      name: this.data.nameRus,
      scaleRank: this.data.scalerank,
    };
  }

  constructor(rootStore, point, type) {
    this.projection = rootStore.projection;
    this.visibility = rootStore.flags.flags.visibility;
    this.data = point;
    this.type = type;
  }
}
