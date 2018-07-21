import { observable, computed, action } from 'mobx';

export default class ColorsModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable auto = false;

  @observable enabled = true;

  @observable zoomPoint = 4;

  @observable options = [
    {
      value: 'auto',
      label: 'Auto'
    },
    {
      value: 'on',
      label: 'Always on'
    },
    {
      value: 'off',
      label: 'Always off'
    }
  ];

  @observable values = {
    auto: { auto: true, enabled: true },
    on: { auto: false, enabled: true },
    off: { auto: false, enabled: false }
  };

  @action selectMode(mode) {
    this.auto = this.values[mode].auto;
    this.enabled = this.values[mode].enabled;
  }

  @computed get value() {
    return this.auto === true
      ? 'auto'
      : this.enabledValue;
  }

  @computed get status() {
    return (this.auto === true)
      ? (this.rootStore.view.roundScale < this.zoomPoint)
      : this.enabled;
  }

  @computed get enabledValue() {
    return this.enabled === true ? 'on' : 'off';
  }

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
      const adminMax = Object.keys(this.ranking[admin]).reduce((color, curColor) => (this.ranking[admin][curColor] > color.value
        ? { value: this.ranking[admin][curColor], id: curColor }
        : color), { value: 0, id: 1 });
      return { ...prev, [admin]: adminMax.id };
    }, {});
  }

  @computed get colors() {
    const props = this.rootStore.borders.bordersProps;
    return props.map(prop => ({
      ...prop,
      colors: this.getFillColors(prop, this.status),
      // id: prop.id,
    }));
  }

  @computed get uniqLegendItems() {
    return Object.values(this.colors).reduce((prev, cur) => {
      // const colors = this.rootStore.colors.colors[idx];
      // disable disputed territory
      if (cur.colors.length > 1) {
        return prev;
      }
      const mapcolor13 = cur.colors.join('_');
      const name = this.rootStore.colors.enabled === true
        ? `${mapcolor13}_${cur.admin.srAdm0A3}`
        : `${mapcolor13}_${cur.disputed}_${cur.type.en}_${cur.admin.srAdm0A3}`;
      return { ...prev, [name]: cur };
    }, {});
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
