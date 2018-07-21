import { observable, computed, action } from 'mobx';

const LOCATION = 'location';
const BORDER = 'border';
const GEO = 'geoEvent';

export default class ClickInfoModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable widgetType = LOCATION;

  @observable selected = null;

  @observable isOpen = true;

  @observable hiddenFlag = {
    visibility: 'hidden',
    scale: 1,
    location: { x: 0, y: 0 }
  };

  @action selectGeoEvent(gev) {
    this.isOpen = true;
    this.widgetType = GEO;
    this.selected = gev;
  }

  @action selectBorder(border) {
    this.isOpen = true;
    this.widgetType = BORDER;
    this.selected = border;
  }

  @action selectLocation(location) {
    this.isOpen = true;
    this.widgetType = LOCATION;
    this.selected = location;
  }

  @action closeWidget() {
    this.widgetType = LOCATION;
    this.selected = null;
    this.isOpen = false;
  }

  @computed get locationFlagStatus() {
    if (this.isOpen !== true || this.selected === null) return this.hiddenFlag;
    if (this.widgetType === LOCATION) {
      return {
        visibility: 'visible',
        scale: this.rootStore.view.preciseScale,
        location: this.rootStore.prepared.data.cities.points[this.selected].location
      };
    } if (this.widgetType === GEO) {
      const geoEvent = this.rootStore.prepared.geoEvents[this.selected];
      return (geoEvent.point.x === null || geoEvent.point.y === null)
        ? this.hiddenFlag
        : {
          visibility: 'visible',
          scale: this.rootStore.view.preciseScale,
          location: {
            x: geoEvent.projected[0],
            y: geoEvent.projected[1],
          }
        };
    }
    // if borders selected no flag
    return this.hiddenFlag;
  }

  @computed get borderWidget() {
    const properties = this.rootStore.data.Properties.data;
    const border = properties[this.selected];
    const disputed = border.disputed !== ''
      ? border.disputed.split(';').map(mapColor => Object.keys(properties).reduce((prev, propId) => {
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
      widgetType: this.widgetType === BORDER,
      border,
      disputed,
      admin,
      type: this.rootStore.data.Types.data[border.type].ru,
    };
  }

  @computed get locationWidget() {
    return {
      widgetType: this.widgetType !== LOCATION,
      location: this.rootStore.prepared.data.cities.points[this.selected].data,
    };
  }

  @computed get widget() {
    if (this.selected === null) return {};
    return this.widgetType === BORDER
      ? this.borderWidget
      : this.locationWidget;
  }
}
