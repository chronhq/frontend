import { put, takeEvery, select } from 'redux-saga/effects';

export const getYear = state => state.timeline.now;
const TIMELINE_ACTIONS = [
  'BORDERS_TIMELINE_FULFILLED',
  'LOCATIONS_TIMELINE_FULFILLED',
  'FACTS_TIMELINE_FULFILLED',
  'PERSONS_TIMELINE_FULFILLED',
  'PERSONS_FACTS_TIMELINE_FULFILLED',
  'EVENTS_GEO_TIMELINE_FULFILLED',
];

function* findCurrent(action) {
  const year = yield select(getYear);
  const type = action.type.replace('FULFILLED', 'CURRENT');
  yield put({ type, year });
}

export default function* assignTimelineCurrentSaga() {
  for (const type of TIMELINE_ACTIONS) {
    yield takeEvery(type, findCurrent);
  }
}