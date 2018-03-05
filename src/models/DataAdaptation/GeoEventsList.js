import { computed } from 'mobx';

export default class GeoEventsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get data() {
    return this.rootStore.prepared.geoEvents;
  }

  @computed get timeline() {
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId].data;
      const year = Number(cur.date.replace(/-.*/g, ''));
      return cur.inventDate in prev
        ? { ...prev, [year]: [...prev[year], cur.id] }
        : { ...prev, [year]: [cur.id] };
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
