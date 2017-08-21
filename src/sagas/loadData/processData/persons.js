import { put } from 'redux-saga/effects';
import {
  personsTimelineFF,
  personsFactsTimelineFF,
  personsFactsFF
} from '../../../reducers/actions';

import { defaultCb } from './_helper';

export const getCurrentYear = state => state.timeline.year.now;

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

function* persons(res, resource, req) {
  const data = defaultCb(res, req.key);
  yield put({ type: 'PERSONS_FULFILLED', payload: { ...data } });

  // const data = action.payload;
  let idCounter = 0;
  const deathById = {};
  const deathFacts = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    const [birth, death] = getBirthAndDeath(cur);
    const newFacts = prev;
    const flag = birth !== null && death !== null;

    idCounter += 1;
    const bornFact = { type: 'born', id: idCounter, person: cur.id, flag };
    idCounter += 1;
    const deathFact = { type: 'death', id: idCounter, person: cur.id, flag };
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
    return { alive,
      data: { ...prevYear.data, [curId]: alive } };
  }, { alive: [], data: {} });

  yield put(personsTimelineFF(timelineYears.data));
  yield put(personsFactsTimelineFF(deathFacts));
  yield put(personsFactsFF(deathById));
}

export default persons;
