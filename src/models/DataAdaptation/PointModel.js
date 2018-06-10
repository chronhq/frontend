import { computed, observable } from 'mobx';

export default class PointModel {
  @observable data = {};
  @observable type = '';

  @computed get projection() {
    return this.rootStore.projection;
  }

  @computed get visibility() {
    return this.rootStore.flags.flags.visibility;
  }

  // @computed get project() {
  //   return this.projection.project;
  // }

  // @computed get projected() {
  //   return this.project([this.point.x, this.point.y]);
  // }

  @computed get point() {
    if (this.type === 'Cities' || this.type === 'GeoEvents') {
      return {
        x: this.data.x,
        y: this.data.y,
      };
    }
    return {
      x: this.data.geopoint[0],
      y: this.data.geopoint[1],
    };
  }
  // Point will be in viewport area after clipping
  @computed get inTheBox() {
    return this.projection.inTheBox(this.point.x, this.point.y);
  }

  @computed get sizeIsOk() {
    if (this.type === 'CityLocs' && this.currentLoc.props !== null) {
      return this.currentLoc.props.scalerank < this.visibility.scale;
    }
    return this.data.scalerank < this.visibility.scale;
  }

  @computed get visible() {
    if (this.type === 'CityLocs') {
      return (this.sizeIsOk && this.inTheBox && this.currentLoc.props !== null);
    }
    return (this.sizeIsOk && this.inTheBox);
  }

  @computed get nameSelector() {
    return this.rootStore.i18n.nameSelector;
  }

  @computed get location() {
    const answer = {
      id: this.data.id,
      ...this.point,
      // x: this.projected[0],
      // y: this.projected[1],
    };
    if (this.type === 'Cities') {
      answer.name = this.data[this.nameSelector];
      answer.scaleRank = this.data.scalerank;
    } else if (this.type === 'CityLocs') {
      try {
        answer.name = this.currentLoc.props[this.nameSelector];
        answer.scaleRank = this.currentLoc.props.scalerank;
      } catch (e) {
        console.error('Something wrong with ', e, this, this.data, this.currentLoc);
        answer.name = 'Undefined';
        answer.scaleRank = '2';
      }
    }
    return answer;
  }

  @computed get now() {
    return this.rootStore.year.now;
  }

  @computed get i18nDate() {
    switch (this.rootStore.i18n.lng) {
      case 'en': return 'Unknown';
      default: return 'Неизвестно';
    }
  }

  @computed get populationRaw() {
    return Object.values(this.rootStore.data.CityPops.data)
      .filter(c => this.data.id === c.cityId);
  }

  @computed get population() {
    return this.populationRaw.map((p) => {
      try {
        const json = JSON.parse(p.json);
        return {
          ...p,
          year: json.year,
          pop: json.pop,
        };
      } catch (e) {
        console.error('Error in population JSON parsing', p);
        console.error(e);
        return {
          ...p, year: 0, pop: 0
        };
      }
    });
  }

  @computed get propertiesRaw() {
    return Object.values(this.rootStore.data.CityProperties.data)
      .filter(c => this.data.id === c.cityId);
  }

  @computed get properties() {
    return this.propertiesRaw.map(p => ({
      ...p,
      date: p.year === null ? this.i18nDate : p.year,
      year: p.year !== null
        ? Number(p.year.split('-').shift())
        : 0
    }));
  }

  @computed get currentLoc() {
    const answer = { pop: null, props: null };
    const getCurrent = (data) => {
      const passed = data.filter(p => p.year <= this.now);
      if (passed.length > 0) {
        const maxYear = Math.max(passed.map(p => p.year));
        return passed.find(p => p.year === maxYear);
      }
      return null;
    };
    answer.pop = getCurrent(this.population);
    answer.props = getCurrent(this.properties);
    return answer;
  }

  constructor(rootStore, point, type) {
    this.rootStore = rootStore;
    this.data = point;
    this.type = type;
  }
}
