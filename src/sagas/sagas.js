import { put, takeEvery, select } from 'redux-saga/effects';

export const getProjectionConfig = state => state.projection;
export const getTerrainJson = state => state.terrain.terrain;

function* applyProjection(action) {
  console.log('Executing saga with action:', action);
  const projection = yield select(getProjectionConfig);
  const json = yield select(getTerrainJson);
  const type = 'TERRAIN_PROJECTED';

  console.time('Projecting');
  const result = projection.path(json);
  console.timeEnd('Projecting');
  yield put({ type, projected: result });
}

function* applyProjectionSaga() {
  yield takeEvery('CHANGE_PROJECTION', applyProjection);
}

export default applyProjectionSaga;
