import { select, put, throttle } from 'redux-saga/effects';

export const getColorsStatus = state => state.runtime.status.landOwnershipColors;

function* handleChangeScale(action) {
  yield put({ ...action, type: 'MAP_VIEW_SCALE_SAGA' });
  const loc = yield select(getColorsStatus);
  if(loc.auto === true) {
    const combinedColors = action.scale < loc.zoomPoint;
    if(loc.enabled !== combinedColors) {
      yield put({ type: 'LAND_OWNERSHIP_COLORS_ENABLED', enabled: combinedColors });
    }
  }
}

export default function* changeProjectionSaga() {
  yield throttle(1000, 'MAP_VIEW_SCALE', handleChangeScale);
}
