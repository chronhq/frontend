import { observable, action } from 'mobx';

export default class ProjectionModel {
  @observable name = 'Mercator';

  // [[Left, Top], [Right, Bottom]]
  @observable clip = [[-180, 90], [180, -90]];

  @observable defaultClip = '[[-180,90],[180,-90]]';

  // https://en.wikipedia.org/wiki/Aircraft_principal_axes
  // https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate
  @observable rotate = [0, 0, 0];

  @observable center = [0, 0];

  @observable clipEnabled = false;

  @action setup(projection) {
    this.clip = projection.clip;
    this.rotate = projection.rotate;
    this.center = projection.center;
    this.name = projection.name;
    this.clipEnabled = JSON.stringify(this.clip) !== this.defaultClip;
  }

  inTheBox(x, y) {
    return (!(x < this.clip[0][0] // Top
        || x > this.clip[1][0] // Bottom
        || y < this.clip[1][1] // Right
        || y > this.clip[0][1]) // Left
    );
  }
}
