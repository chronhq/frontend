/**
 * @file Catching every FULFILLED request action which affects timeline
 * Action on XXX_TIMELINE_CURRENT is equivalent to SET_YEAR|PREV_YEAR
 * If the (CHANGE)_YEAR was performed and necessary data was not loaded,
 * this saga will fix timeline status after data will be loaded
*/

import { put, takeEvery, select } from 'redux-saga/effects';

export const getYear = state => state.timeline.now;
const TIMELINE_ACTIONS = [
  'BORDERS_TIMELINE_FULFILLED',
  'LOCATIONS_TIMELINE_FULFILLED',
  'INVENTIONS_TIMELINE_FULFILLED',
  'PERSONS_TIMELINE_FULFILLED',
  'PERSONS_FACTS_TIMELINE_FULFILLED',
  'EVENTS_GEO_TIMELINE_FULFILLED',
];

function* findCurrent(action) {
  const year = yield select(getYear);
  const type = action.type.replace('FULFILLED', 'CURRENT');
  if (typeof(year) !== 'undefined') {
    yield put({ type, year });
  }
}

export default function* assignTimelineCurrentSaga() {
  for (const type of TIMELINE_ACTIONS) {
    yield takeEvery(type, findCurrent);
  }
}