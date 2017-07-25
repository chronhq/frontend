/**
 * @file Throttling MAP_VIEW_SCALE_SAGA and toggling LAND_OWNERSHIP_COLORS_AUTO
 * Reducing number of 'dispatches' when user uses mousewheel zoom
 * Dispatching LAND_OWNERSHIP_COLORS_AUTO if needed
*/

import { select, put, throttle } from 'redux-saga/effects';
import { mapViewScale, colorsDataAutoToggle } from '../reducers/actions';

export const getColorsStatus = state => state.runtime.colorsData;

function* handleChangeScale(action) {
  yield put(mapViewScale(action.scale, action.buttonZoom));
  const loc = yield select(getColorsStatus);
  if (loc.auto === true) {
    const combinedColors = action.scale < loc.zoomPoint;
    if (loc.enabled !== combinedColors) {
      yield put(colorsDataAutoToggle(combinedColors));
    }
  }
}

export default function* changeProjectionSaga() {
  yield throttle(1000, 'MAP_VIEW_SCALE_SAGA', handleChangeScale);
}
