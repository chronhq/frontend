import { computed } from 'mobx';

export default class InventionsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
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
