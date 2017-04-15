import { put, select } from 'redux-saga/effects';

export const getCurrentYear = state => state.timeline.now;

function getBirthAndDeath(cur) {
  let birth = null;
  let death = null;
  if (cur.birth_date !== null) {
    try {
      birth = Number(cur.birth_date.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  if (cur.death_date !== null) {
    try {
      death = Number(cur.death_date.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  return [birth, death];
}

function* personsTimeline(action) {
  const data = action.payload;
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
  yield put({
    type: 'PERSONS_TIMELINE_FULFILLED',
    payload: {
      byYear: timelineYears.data,
      allYears: Object.keys(timelineYears.data)
    }
  });
  yield put({
    type: 'PERSONS_FACTS_TIMELINE_FULFILLED',
    payload: {
      byYear: deathFacts,
      allYears: Object.keys(deathFacts)
    }
  });
  yield put({
    type: 'PERSONS_FACTS_FULFILLED',
    payload: {
      byId: deathById
    }
  });
}

export default personsTimeline;
