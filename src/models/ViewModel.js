import { observable, action, computed } from 'mobx';

export default class ViewModel {
  // changed after resize event
  @observable width = window.innerWidth;

  @observable height = window.innerHeight;

  @observable milesInKm = 0.621371;

  @observable fonts = {};

  @computed get scaleRaw() {
    const earth = 40075; // in km
    const pixels = (1024 * this.rootStore.deck.zoom);
    const pxPerKm = earth / pixels;
    return pxPerKm;
  }

  @computed get scaleWidget() {
    switch (this.rootStore.i18n.lng) {
      case 'ru':
        return {
          value: Math.round(this.scaleRaw * 100),
          units: 'Km'
        };
      default:
        return {
          value: Math.round(this.scaleRaw * this.milesInKm * 100),
          units: 'Miles'
        };
    }
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.transform = this.defaultTransform;
  }

  @action setSize(w, h) {
    this.width = w;
    this.height = h;
  }
}
