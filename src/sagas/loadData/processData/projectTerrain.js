import { put, select } from 'redux-saga/effects';
import { projectionSelector, defaultCb } from './_helper';

function* projectTerrain(res) {
  const data = defaultCb(res);
  const projection = yield select(projectionSelector);
  const pathFn = projection.path;
  const projected = res.reduce((prev, cur) => ({ ...prev, [cur.id]: pathFn(cur.contour) }), {});
  const payload = { ...data, projected };
  yield put({ type: 'TERRAIN_FULFILLED', payload });
}

export default projectTerrain;
