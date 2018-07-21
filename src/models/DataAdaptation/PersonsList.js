
import { computed } from 'mobx';
import { getBirthAndDeath, getActualData } from './_helper';

export default class PersonsList {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed get data() {
    return this.rootStore.data.Persons.data;
  }

  @computed get facts() {
    let idCounter = 0;
    const deathById = {};
    const deathFacts = Object.keys(this.data).reduce((prev, curId) => {
      const cur = this.data[curId];
      const [birth, death] = getBirthAndDeath(cur);
      const newFacts = prev;
      const flag = birth !== null && death !== null;

      idCounter += 1;
      const bornFact = {
        type: 'born', id: idCounter, person: cur.id, flag
      };
      idCounter += 1;
      const deathFact = {
        type: 'death', id: idCounter, person: cur.id, flag
      };
      if (birth !== null) {
        deathById[bornFact.id] = bornFact;
        newFacts[birth] = birth in newFacts
          ? { ...newFacts[birth], birth: [...newFacts[birth].birth, bornFact] }
          : { death: [], birth: [bornFact] };
      }
      if (death !== null) {
        deathById[deathFact.id] = deathFact;
        newFacts[death] = death in newFacts
          ? { ...newFacts[death], death: [...newFacts[death].death, deathFact] }
          : { death: [deathFact], birth: [] };
      }
      return newFacts;
    }, {});
    return {
      deathFacts, deathById
    };
  }

  @computed get timeline() {
    const { deathFacts } = this.facts;
    const timelineYears = Object.keys(deathFacts).reduce((prevYear, curId) => {
      const factInThisYear = [...deathFacts[curId].birth, ...deathFacts[curId].death];
      const alive = factInThisYear.reduce((prevAlive, curFact) => {
        if (typeof prevAlive !== 'undefined') {
          // if flag is false - only one date is available,
          // can't build timeline for this person
          return curFact.type === 'born' && curFact.flag
            // some one is born, adding to array
            ? [...prevAlive, curFact.id]
            // remove dead body
            : prevAlive.filter(val => val !== curFact.id);
        }
        return [];
      }, prevYear.alive);
      return {
        alive,
        data: { ...prevYear.data, [curId]: alive }
      };
    }, { alive: [], data: {} });
    return timelineYears.data;
  }

  @computed get year() {
    return this.rootStore.year.now;
  }

  @computed get alive() {
    return getActualData(Object.keys(this.timeline), this.timeline, this.year);
  }

  @computed get current() {
    const { deathFacts } = this.facts;
    return (this.year in deathFacts)
      ? deathFacts[this.year]
      : { birth: [], death: [] };
  }
}
