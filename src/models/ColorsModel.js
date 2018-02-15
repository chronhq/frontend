import { observable, computed } from 'mobx';

export default class ColorsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable auto = false;
  @observable enabled = true;
  @observable zoomPoint = 4;

  @computed get data() {
    return this.rootStore.data.Properties.data;
  }

  @computed get ranking() {
    // Count the colors per 'admin'
    return Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      if (cur.disputed !== '') return prev;
      const admin = prev[cur.admin] || {};
      admin[cur.color] = (admin[cur.color] || 0) + 1;
      return { ...prev, [cur.admin]: admin };
    }, {});
  }

  @computed get topColors() {
    // Find the most common color for this 'admin'
    return Object.keys(this.ranking).reduce((prev, admin) => {
      const adminMax = Object.keys(this.ranking[admin]).reduce((color, curColor) =>
        (this.ranking[admin][curColor] > color.value
          ? { value: this.ranking[admin][curColor], id: curColor }
          : color), { value: 0, id: 1 });
      return { ...prev, [admin]: adminMax.id };
    }, {});
  }

  @computed get colors() {
    const props = this.rootStore.borders.bordersProps;
    return props.map(prop => ({
      colors: this.getFillColors(prop, this.enabled),
      id: prop.id,
    }));
  }

  getFillColors(property, enabled) {
    // if disputed return every color
    if (property.disputed !== '') {
      const arr = property.disputed.split(/;/);
      return arr;
    }
    return enabled === true
      // one of the topColors if grouping enabled
      ? [this.topColors[property.admin.id]]
      : [property.color];
  }
}
