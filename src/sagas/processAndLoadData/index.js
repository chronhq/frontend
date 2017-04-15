import { takeEvery } from 'redux-saga/effects';

import loadGeoData from './loadGeoData';
import personsTimeline from './personsTimeline';
import locationsTimeline from './locationsTimeline';
import factsTimeline from './factsTimeline';

export default function* processAndLoadData() {
  // Load borders
  yield takeEvery('BORDERS_TIMELINE_FULFILLED', loadGeoData);
  yield takeEvery('SET_YEAR', loadGeoData);
  yield takeEvery('PREV_YEAR', loadGeoData);
  yield takeEvery('NEXT_YEAR', loadGeoData);

  // Generate getTimelineBorders
  yield takeEvery('LOCATIONS_FULFILLED', locationsTimeline);

  // generatePersonsTimeline
  yield takeEvery('PERSONS_FULFILLED', personsTimeline);

  // generatePersonsTimeline
  yield takeEvery('FACTS_FULFILLED', factsTimeline);
}
