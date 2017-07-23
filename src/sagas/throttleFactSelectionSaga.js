import { put, throttle } from 'redux-saga/effects';

function* handleSelection(action) {
  yield put({ ...action, type: 'SELECT_LOCATION' });
}

export default function* changeProjectionSaga() {
  yield throttle(500, 'SELECT_LOCATION_SAGA', handleSelection);
}
