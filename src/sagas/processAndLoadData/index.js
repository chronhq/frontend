import { takeEvery } from 'redux-saga/effects';

import loadGeoData from './loadGeoData';
import personsTimeline from './personsTimeline';
import locationsTimeline from './locationsTimeline';
import factsTimeline from './factsTimeline';
import geoEventsTimeline from './geoEventsTimeline';
import colorsData from './colorsData';

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

  // generateGeoEventsTimeline
  yield takeEvery('EVENTS_GEO_FULFILLED', geoEventsTimeline);

  // generate additional colors from Properties
  yield takeEvery('PROPERTIES_FULFILLED', colorsData);
}
