import { observable, computed } from 'mobx';

export default class InventionsList {
  @observable saveDataCb = (json) => {
    const data = {};
    json.map((cur) => {
      data[cur.id] = {
        ...cur,
        // Inventor field before looks like "{1,3}" => now it's an array
        inventor: cur.inventor.replace(/{|}/g, '').split(','),
      };
      return false;
    });
    this.rootStore.data.Inventions.data = data;
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.rootStore.data.Inventions.saveDataCb = json => this.saveDataCb(json);
  }

  @computed get data() {
    return this.rootStore.data.Inventions.data;
  }

  @computed get timeline() {
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      return cur.inventDate in prev
        ? { ...prev, [cur.inventDate]: [...prev[cur.inventDate], cur.id] }
        : { ...prev, [cur.inventDate]: [cur.id] };
    }, {});
  }

  @computed get year() {
    return this.rootStore.year.now;
  }

  @computed get current() {
    return (this.year in this.timeline)
      ? this.timeline[this.year]
      : [];
  }
}
