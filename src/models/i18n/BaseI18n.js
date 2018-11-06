import { computed } from 'mobx';

export default class BaseI18N {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get lng() {
    return this.rootStore.i18n.lng;
  }

  @computed get data() {
    return this.rootStore.i18n.data;
  }

  @computed get nameSelector() {
    return this.rootStore.i18n.nameSelector;
  }

  @computed get persons() {
    return this.rootStore.data.Persons.data;
  }

  @computed get cities() {
    return this.rootStore.prepared.data.cities.points;
  }
}
