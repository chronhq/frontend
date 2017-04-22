import { put, throttle } from 'redux-saga/effects';

function* handleChangeScale(action) {
  yield put({ ...action, type: 'MAP_VIEW_SCALE_SAGA' });
}

export default function* changeProjectionSaga() {
  yield throttle(1000, 'MAP_VIEW_SCALE', handleChangeScale);
}
