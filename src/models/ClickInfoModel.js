import { observable, computed, action } from 'mobx';

export default class ClickInfoModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable widgetType = false;
  @observable selected = null;
  @observable isOpen = true;

  @action selectBorder(border) {
    this.isOpen = true;
    this.widgetType = true;
    this.selected = border;
  }

  @action selectLocation(location) {
    this.isOpen = true;
    this.widgetType = false;
    this.selected = location;
  }

  @action closeWidget() {
    this.widgetType = false;
    this.selected = null;
    this.isOpen = false;
  }

  @computed get borderWidget() {
    const properties = this.rootStore.data.Properties.data;
    const border = properties[this.selected];
    const disputed = border.disputed !== ''
      ? border.disputed.split(';').map(mapColor => // map over mapcolor13 of admin
        // console.log('disputed', border.disputed, mapColor);
        Object.keys(properties).reduce((prev, propId) => {
          // console.log(prev, properties[propId].disputed === "",
          // Number(properties[propId].mapcolor13) === Number(mapColor),
          // properties[propId].admin
          // );
          if (prev === '?') {
            if (properties[propId].disputed === ''
                && properties[propId].color === mapColor) {
              const id = properties[propId].admin;
              // console.log('returning', this.rootStore.admin[id].ru);
              return this.rootStore.data.Admins.data[id].ru;
            }
          }
          return prev;
        }, '?'))
      : [];
    const admin = this.rootStore.data.Admins.data[border.admin].ru;
    return {
      widgetType: this.widgetType,
      border,
      disputed,
      admin,
      type: this.rootStore.data.Types.data[border.type].ru,
    };
  }

  @computed get locationWidget() {
    return {
      widgetType: this.widgetType,
      location: this.rootStore.locations.cities[this.selected].data,
    };
  }

  @computed get widget() {
    if (this.selected === null) return {};
    return this.widgetType === true
      ? this.borderWidget
      : this.locationWidget;
  }
}
