/**
 * @file Throttling MAP_VIEW_SCALE_SAGA and toggling LAND_OWNERSHIP_COLORS_AUTO
 * Reducing number of 'dispatches' when user uses mousewheel zoom
 * Dispatching LAND_OWNERSHIP_COLORS_AUTO if needed
*/

import { select, put, throttle } from 'redux-saga/effects';

export const getColorsStatus = state => state.runtime.colorsData;

function* handleChangeScale(action) {
  yield put({ ...action, type: 'MAP_VIEW_SCALE' });
  const loc = yield select(getColorsStatus);
  if(loc.auto === true) {
    const combinedColors = action.scale < loc.zoomPoint;
    if(loc.enabled !== combinedColors) {
      yield put({ type: 'LAND_OWNERSHIP_COLORS_AUTO', enabled: combinedColors });
    }
  }
}

export default function* changeProjectionSaga() {
  yield throttle(1000, 'MAP_VIEW_SCALE_SAGA', handleChangeScale);
}
