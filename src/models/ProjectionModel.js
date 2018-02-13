import { observable, action, computed } from 'mobx';
import * as d3 from 'd3-geo';

export default class ProjectionModel {
  @observable name = 'Equirectangular';
  // [[Left, Top], [Right, Bottom]]
  @observable clip = [[-180, 90], [180, -90]];
  // https://en.wikipedia.org/wiki/Aircraft_principal_axes
  // https://github.com/d3/d3-geo/blob/master/README.md#projection_rotate
  @observable rotate = [0, 0, 0];
  @observable center = [0, 0];
  @observable projectionByName = {
    Mercator: d3.geoMercator(),
    Equirectangular: d3.geoEquirectangular(),
    ConicEqualArea: d3.geoConicEqualArea()
  };
  @observable geoPath = d3.geoPath();

  @observable projectCity = city => this.project([city.x, city.y])
    .reduce((prev, cur, i) => (
      { ...prev, [i === 0 ? 'x' : 'y']: cur }
    ), {});

  @computed get mapDimensions() {
    const points = this.clip.map(this.project);
    return {
      topLeft: points[0],
      bottomRight: points[1],
      mapWidth: points[1][0] - points[0][0],
      mapHeight: points[1][1] - points[0][1]
    };
  }
  @computed get projection() {
    return this.projectionByName[this.name];
  }

  @computed get project() {
    const p = this.projection.center(this.center).rotate(this.rotate);
    return p.clipExtent(p(this.clip[0]), p(this.clip[1]));
  }

  @computed get path() {
    return this.geoPath.projection(this.project);
  }

  @action setup(projection) {
    this.clip = projection.clip;
    this.rotate = projection.rotate;
    this.center = projection.center;
    this.name = projection.name;
  }

  @action setProjection(name) {
    if (this.name !== name && name in this.projectionByName) {
      this.name = name;
    }
  }
}
