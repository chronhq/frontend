import { observable, computed, action } from 'mobx';

export default class ViewModel {
  // this will be overwritten by MapView d3.event
  @observable transform = {};
  // changed after resize event
  @observable width = window.innerWidth;
  @observable height = window.innerHeight;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.transform = this.defaultTransform;
  }

  @action setSize(w, h) {
    this.width = w;
    this.height = h;
  }

  @computed get defaultTransform() {
    return {
      k: this.defaultZoom,
      x: this.mapDimensions.mapShift[0],
      y: this.mapDimensions.mapShift[1],
    };
  }

  @computed get preciseScale() {
    return this.transform.k;
  }

  @computed get roundScale() {
    return Math.round(this.transform.k);
  }

  @computed get mapDimensions() {
    return this.rootStore.projection.mapDimensions;
  }


  @computed get svgTransform() {
    const { x, y, k } = this.transform;
    // `translate(${x}, ${y}) scale(${k}) rotate(${this.rotation})`;
    return `translate(${x}, ${y}) scale(${k})`;
  }

  @computed get defaultZoom() {
    const w = window.innerWidth / this.mapDimensions.mapWidth;
    const h = window.innerHeight / this.mapDimensions.mapHeight;
    return w > h ? h : w;
  }

  @computed get widgetTransform() {
    const x = this.width > 768 ? 100 : 60;
    const y = this.height - 100;
    return `translate(${x}, ${y})`;
  }
}
