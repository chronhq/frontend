import { computed, observable } from 'mobx';

export default class CityModel {
  @observable cityId = 1;

  @computed get data() {
    return this.rootStore.data.CityLocs.data[this.cityId];
  }

  @computed get point() {
    return {
      x: this.data.geopoint[0],
      y: this.data.geopoint[1],
    };
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

  @computed get visible() {
    return (this.currentLoc.props !== null);
  }

  @computed get location() {
    const answer = {
      id: this.data.id,
      ...this.point,
    };
    try {
      answer.name = this.currentLoc.props[this.nameSelector];
      answer.scaleRank = this.currentLoc.props.scalerank;
    } catch (e) {
      console.error('Something wrong with ', e, this, this.data, this.currentLoc);
      answer.name = 'Undefined';
      answer.scaleRank = '2';
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

  @computed get nameSelector() {
    return this.rootStore.i18n.nameSelector;
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

  constructor(rootStore, cityId) {
    this.rootStore = rootStore;
    this.cityId = cityId;
  }
}
