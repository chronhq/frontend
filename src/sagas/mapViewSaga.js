import { put, throttle } from 'redux-saga/effects';

function* handleChangeScale(action) {
  yield put({ type: 'MAP_VIEW_SCALE_SAGA', scale: action.scale });
}

export default function* changeProjectionSaga() {
  yield throttle(1000, 'MAP_VIEW_SCALE', handleChangeScale);
}
