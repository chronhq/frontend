import { put, takeEvery, select } from 'redux-saga/effects';
import { getNextData, getActualData, askBackend } from '../reducers/actions';

export const getProjection = state => ({
  name: state.projection.name,
  rotate: state.projection.rotate
});

export const getTimelineBorders = state => state.timeline.borders;
export const getLoadedGeometry = state => state.borders;

export const getCurrentYear = state => state.timeline.now;

export function getIdsFromTimeline(type, t, loaded = {}) {
  // type must be geo or props
  return Object.keys(t).reduce(
    (prev, cur) => (t[cur][type] in loaded ? prev : [...prev, t[cur][type]])
    , []
  );
}

function* loadGeoData(action) {
  console.time('Loading GeoData Saga');
  const geometryData = yield select(getLoadedGeometry);
  const loadedGeometry = geometryData.byYear;

  const projection = yield select(getProjection);
  const borders = yield select(getTimelineBorders);
  const targetYear = yield select(getCurrentYear);
  const dataToLoad = action.type === 'NEXT_YEAR'
    ? getNextData(borders.allYears, borders.byYear, targetYear)
    // BORDERS_TIMELINE_FULFILLED or SET_YEAR or PREV_YEAR
    : getActualData(borders.allYears, borders.byYear, targetYear);
  const geoIds = getIdsFromTimeline('geo', dataToLoad, loadedGeometry);
  // Loading new geometry
  if (geoIds.length > 0 && geometryData.loading === false) {
    console.log('Asking for geo ids', geoIds);
    yield put(askBackend('BORDERS', {
      projection,
      ids: geoIds
    }));
  } else {
    yield put({ type: 'BORDERS_FULFILLED', payload: { projected: {}, byYear: {} } });
    console.log('Nothing new to obtain from server');
  }

  console.timeEnd('Loading GeoData Saga');
}

function* buildCitiesTimeline(action) {
  const places = action.payload.places;
  const timeline = Object.keys(places).reduce((prev, cur) => {
    const place = places[cur];
    if ('founded' in place && place.founded !== '' && place.founded !== null) {
      const year = Number(place.founded.split('-').shift());
      if (!(year in prev)) {
        return { ...prev, [year]: [place.id] };
      }
      return { ...prev, [year]: [...prev[year], place.id] };
    }
    return { ...prev };
  }, {});

  let previousYear;
  for (const currentYear of Object.keys(timeline)) {
    if (!(typeof previousYear === 'undefined')) {
      timeline[currentYear] = [...timeline[previousYear], ...timeline[currentYear]];
    }
    previousYear = currentYear;
  }

  yield put({
    type: 'LOCATIONS_TIMELINE_FULFILLED',
    payload: {
      byYear: timeline,
      allYears: Object.keys(timeline),
      current: []
    }
  });
}

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

function* generatePersonsTimeline(action) {
  const data = action.payload;
  const deathFacts = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    const [birth, death] = getBirthAndDeath(cur);
    const newFacts = prev;
    const flag = birth !== null && death !== null;
    const bornFact = { type: 'born', id: cur.id, flag };
    const deathFact = { type: 'death', id: cur.id, flag };
    if (birth !== null) {
      newFacts[birth] = birth in newFacts
        ? [...newFacts[birth], bornFact]
        : [bornFact];
    }
    if (death !== null) {
      newFacts[death] = death in newFacts
        ? [...newFacts[death], deathFact]
        : [deathFact];
    }
    return newFacts;
  }, {});
  const timelineYears = Object.keys(deathFacts).reduce((prevYear, curId) => {
    const alive = deathFacts[curId].reduce((prevAlive, curFact) => {
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
      facts: deathFacts,
      byYear: timelineYears.data,
      allYears: Object.keys(timelineYears.data)
    }
  });
  const year = yield select(getCurrentYear);
  yield put({ type: 'PERSONS_TIMELINE_CURRENT', year });
}

function* generateFactsTimeline(action) {
  const data = action.payload;
  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    return cur.invent_date in prev
      ? { ...prev, [cur.invent_date]: [...prev[cur.invent_date], cur.id] }
      : { ...prev, [cur.invent_date]: [cur.id] };
  }, {});
  yield put({
    type: 'FACTS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  });
}

export default function* whenDataIsLoaded() {
  // Load borders
  yield takeEvery('BORDERS_TIMELINE_FULFILLED', loadGeoData);
  yield takeEvery('SET_YEAR', loadGeoData);
  yield takeEvery('PREV_YEAR', loadGeoData);
  yield takeEvery('NEXT_YEAR', loadGeoData);

  // Generate getTimelineBorders
  yield takeEvery('LOCATIONS_FULFILLED', buildCitiesTimeline);

  // generatePersonsTimeline
  yield takeEvery('PERSONS_FULFILLED', generatePersonsTimeline);

  // generatePersonsTimeline
  yield takeEvery('FACTS_FULFILLED', generateFactsTimeline);
}
