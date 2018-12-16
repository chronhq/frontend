/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { computed } from 'mobx';

function getBirthAndDeath(cur) {
  let birth = null;
  let death = null;
  if (cur.birthDate !== null) {
    try {
      birth = Number(cur.birthDate.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  if (cur.deathDate !== null) {
    try {
      death = Number(cur.deathDate.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  return [birth, death];
}

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

  @computed get current() {
    const { deathFacts } = this.facts;
    return (this.year in deathFacts)
      ? deathFacts[this.year]
      : { birth: [], death: [] };
  }

  @computed get pins() {
    const pins = [];
    const free = [];
    ['birth', 'death'].map(type => (
      this.current[type].map((perFact) => {
        const typePlace = `${type}Place`;
        const person = this.data[perFact.person];
        const locId = person[typePlace];
        if (locId !== 0) {
          const loc = this.rootStore.prepared.data.cities.points[locId].location;
          pins.push({ type, loc, person });
        } else {
          free.push({ type, person });
        }
        return false;
      })
    ));
    return { pins, free };
  }
}
