import { observable, computed } from 'mobx';

export default class YearControlModel {
  @observable nowState;

  @observable sync = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get now() {
    if (this.sync) {
      return this.rootStore.year.now;
    }
    return this.nowState;
  }
}
