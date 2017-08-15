import { takeEvery } from 'redux-saga/effects';

import loadGeoData from './loadGeoData';
import loadData from './loadData';

export default function* processAndLoadData() {
  // Find new borders to Load
  yield takeEvery('SET_YEAR', loadGeoData);
  yield takeEvery('PREV_YEAR', loadGeoData);
  yield takeEvery('NEXT_YEAR', loadGeoData);

  // Handle data loading
  yield takeEvery('LOAD_DATA_SAGA', loadData);

}
