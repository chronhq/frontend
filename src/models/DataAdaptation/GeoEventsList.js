import { computed } from 'mobx';

export default class GeoEventsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get data() {
    const data = {};
    Object.values(this.rootStore.data.GeoEvents.data).map((d) => {
      data[d.id] = { ...d, description: [d.description[this.lng]] };
      return null;
    });
    return data;
  }

  @computed get timeline() {
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      try {
        const year = Number(cur.date.replace(/-.*/g, ''));
        return year in prev
          ? { ...prev, [year]: [...prev[year], cur.id] }
          : { ...prev, [year]: [cur.id] };
      } catch (e) {
        console.error('Processing GeoEventsList', cur);
        return prev;
      }
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
