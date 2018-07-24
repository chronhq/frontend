import { observable, action } from 'mobx';

export default class ViewModel {
  // changed after resize event
  @observable width = window.innerWidth;

  @observable height = window.innerHeight;

  // @observable kmPerPx = 32;

  // @observable milesPerPx = 20;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.transform = this.defaultTransform;
  }

  @action setSize(w, h) {
    this.width = w;
    this.height = h;
  }
}
