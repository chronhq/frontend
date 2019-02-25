import {
  observable, computed
} from 'mobx';

import MapColors from './MapColors';

export default class SpaceTimeVolume {
  @observable mapColors = MapColors;

  @observable id;

  @observable data = {};

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get startDate() {
    return this.data.start_date.split('-')[0];
  }

  @computed get endDate() {
    return this.data.end_date.split('-')[0];
  }

  @computed get visible() {
    return (this.startDate <= this.now && this.now <= this.endDate);
  }

  @computed get wId() {
    return `Q${this.te.wikidata_id}`;
  }

  @computed get wikidata() {
    if (this.rootStore.wikidata.cache[this.wId] === undefined) {
      // TODO fetch wikidata item as a reaction on hover or directly in balloon
      // there is no good solution for this
      // https://github.com/mobxjs/mobx/issues/307
      this.rootStore.wikistore.countries.add([this.wId], true);
      return {};
    }
    return this.rootStore.wikidata.cache[this.wId];
  }

  @computed get te() {
    // TODO: add conditions for admin_level and relations
    return this.rootStore.data.territorialEntities.data[this.data.entity];
  }

  @computed get title() {
    // admin_level = 2
    return this.wikidata.label;
  }

  @computed get subTitle() {
    // TODO: This one depends on the relations
    // Better switch to an array
    // labels for wikidata_items from deeper admin levels to top (admin_level = 3)
    return this.te.name;
  }

  @computed get values() {
    return {
      title: this.title,
      subTitle: this.subTitle,
      flag: this.wikidata.activeFlag,
      emblem: this.wikidata.emblem,
      capital: this.wikidata.capital,
      head: this.wikidata.currentHead,
      government: this.wikidata.currentGovernment,
      population: this.wikidata.currentPopulation,
      dataOrigin: this.wikidata.dataOrigin,
      sources: this.data.references
    };
  }

  @computed get color() {
    try {
      const color = this.mapColors[this.te.color].color1;
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    } catch (e) {
      // console.error('ColorID', this.data.color, 'Props', this.data);
      // Probably colorID === -99 -- Disputed territory
      return 'rgb(127, 127, 127)';
    }
  }

  constructor(rootStore, id, data) {
    this.rootStore = rootStore;
    this.id = id;
    this.data = data;
  }
}
