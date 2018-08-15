import {
  observable, computed
} from 'mobx';

class Property {
  @observable id;

  @computed get data() {
    return this.rootStore.data.Properties.data[this.id];
  }

  @computed get admin() {
    return this.rootStore.data.Admins.data[this.data.admin];
  }

  @computed get type() {
    return this.rootStore.data.Types.data[this.data.type];
  }

  @computed get color() {
    const colors = this.rootStore.data.MapColors.data;
    try {
      const color = colors[this.data.color].color1;
      return [color[0], color[1], color[2]];
    } catch (e) {
      // console.error('ColorID', this.data.color, 'Props', this.data);
      // Probably colorID === -99 -- Disputed territory
      return [127, 127, 127];
    }
  }

  constructor(rootStore, id) {
    this.rootStore = rootStore;
    this.id = id;
  }
}

export default class PropertiesModel {
  @computed get properties() {
    return this.rootStore.data.Properties.data;
  }

  @computed get data() {
    return Object.values(this.properties).reduce((prev, cur) => ({
      ...prev,
      [cur.id]: new Property(this.rootStore, cur.id)
    }), {});
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}
