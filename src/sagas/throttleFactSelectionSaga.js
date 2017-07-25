/**
 * @file Throttling mouseover event on 'Feed' (Show LocationFlag)
*/

import { put, throttle } from 'redux-saga/effects';
import { selectLocationSaga } from '../reducers/actions';

function* handleSelection(action) {
  yield put(selectLocationSaga(action));
}

export default function* changeProjectionSaga() {
  yield throttle(500, 'SELECT_LOCATION_SAGA', handleSelection);
}
