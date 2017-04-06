import { put, throttle } from 'redux-saga/effects';

function* handleSelection(action) {
  yield put({ type: 'SELECT_LOCATION_SAGA', location: action.location });
}

export default function* changeProjectionSaga() {
  yield throttle(500, 'SELECT_LOCATION', handleSelection);
}
