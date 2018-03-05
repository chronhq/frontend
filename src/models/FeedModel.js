import { observable, action, computed } from 'mobx';

export default class FeedModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  getLocationName = (id) => {
    if (id in this.rootStore.prepared.locations) {
      const loc = this.rootStore.prepared.locations[id];
      return `${loc.nameRus} (${loc.nameEng}, ${loc.admin_1}, ${loc.adm_0})`;
    }
    return 'Неизвестно';
  }

  getInventors = (inventors) => {
    const persons = this.rootStore.prepared.persons.data;
    return inventors.reduce((prev, p) =>
      (typeof persons[p] === 'undefined'
        ? prev
        : [...prev, persons[p].nameRus]), []);
  }

  getDate = date => (date || '????');
  newLine = window.navigator.platform === 'Win32' ? '\r\n' : '\n';

  getFactDescription = (factId) => {
    const fact = this.rootStore.prepared.inventions.data[factId];
    const loc = this.getLocationName(fact.invent_place);
    const ppl = this.getInventors(fact.inventor);
    return [
      `Название: "${fact.nameRus}"`,
      `Дата: ${fact.inventDate}, Место: "${loc}"`,
      `Участники: "${ppl.join(', ')}"`,
      `Описание: "${fact.description}"`,
      `Дополнительная информация: "${fact.link}"`,
      ''
    ].join(this.newLine);
  }

  getPersonFacts = (factId) => {
    const fact = this.rootStore.prepared.persons.facts.deathById[factId];
    // const fact = state.personsFacts[factId];
    const person = this.rootStore.prepared.persons.data[fact.person];
    const birthLoc = this.getLocationName(person.birthPlace);
    const deathLoc = this.getLocationName(person.deathPlace);

    const birthDate = this.getDate(person.birthDate);
    const deathDate = this.getDate(person.deathDate);
    return [
      `Имя: "${person.nameRus}"`,
      `Годы жизни: "${birthDate} - ${deathDate}"`,
      `Место рождения: "${birthLoc}"`,
      `Место смерти: "${deathLoc}"`,
      ''
    ].join(this.newLine);
  }

  getGeoEventsFact = (factId) => {
    const fact = this.rootStore.prepared.geoEvents[factId].data;
    return [
      `Дата: ${fact.date}`,
      `Описание: "${fact.description}"`,
      ''
    ].join(this.newLine);
  }

  @observable persons = {};
  @observable inventions = {};
  @observable geoEvents = {};

  @observable feedDownloadLinkId = 'exportFromFeedDownloadLink';

  @computed get selected() {
    console.log('persons', this.persons);
    const persons = Object.keys(this.persons)
      .filter(c => this.persons[c] === true)
      .map(this.getPersonFacts);
    console.log('inventions', this.inventions);
    const inventions = Object.keys(this.inventions)
      .filter(c => this.inventions[c] === true)
      .map(this.getFactDescription);
    console.log('geoEvents', this.geoEvents);
    const geoEvents = Object.keys(this.geoEvents)
      .filter(c => this.geoEvents[c] === true)
      .map(this.getGeoEventsFact);
    const data = [...persons, ...inventions, ...geoEvents].join(this.newLine);

    return data;
  }

  @action wipe() {
    this.persons = {};
    this.inventions = {};
    this.geoEvents = {};
  }

  @action export(filename) {
    const blob = new Blob([this.selected], {
      encoding: 'UTF-8',
      type: 'text/plain;charset=UTF-8'
    });

    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const fileData = window.URL.createObjectURL(blob);

      const targetA = document.getElementById(this.feedDownloadLinkId);
      targetA.href = fileData;
      targetA.download = filename;
      targetA.click();
    }
    this.wipe();
  }
}
