/**
 * @file Catching every CHANGE_PROJECTION_SAGA and calculating new projections
 * Calculating new points for TERRAIN, BORDERS, GEO_EVENTS, LOCATIONS
*/

import { put, takeEvery, select } from 'redux-saga/effects';

export const getProjectionConfig = state => state.runtime.projection;
export const getPath = state => state.runtime.projection.path;
export const getProjection = state => state.runtime.projection.project;

export const awaitingNewPath = [
  ['TERRAIN_PROJECTED', state => state.data.terrain.byId],
  ['BORDERS_PROJECTED', state => state.data.borders.byId]
];

export const hasPoints = [
  ['LOCATIONS_PROJECTED', state => state.data.locations.places],
  ['EVENTS_GEO_PROJECTED', state => state.data.geoEvents.byId],
];
const checkRotation = (cur, prev) => (
  cur.rotate[0] === prev.rotate[0]
  && cur.rotate[1] === prev.rotate[1]
  && cur.rotate[2] === prev.rotate[2]
);

const checkClip = (cur, prev) => (
  cur.clip[0] === prev.clip[0] && cur.clip[1] === prev.clip[1]
);

const checkCenter = (cur, prev) => (
  cur.center === prev.center
);
const sameProjection = (cur, prev) => (
  cur.name === prev.name
  && checkRotation(cur, prev) 
  && checkClip(cur, prev)
  && checkCenter(cur, prev)
);

function* changeProjection(action) {
  console.time('Change_Projection Saga');
  // Validate if there is a need to project a data
  const prevProjection = yield select(getProjectionConfig);
  if (sameProjection(action, prevProjection)) {
    console.timeEnd('Change_Projection Saga');
    return false;
  }
  // Save new data
  yield put({ ...action, type: 'CHANGE_PROJECTION' });

  const path = yield select(getPath);

  /* eslint-disable no-restricted-syntax */
  for (const [type, selector] of awaitingNewPath) {
    // pathProjection
    console.time(`pathProjection ${type}`);

    const json = yield select(selector);
    const jsonCb = type === 'TERRAIN_PROJECTED'
      ? cur => path(json[cur].contour)
      : cur => path(json[cur]);
    try {
      const projected = Object.keys(json).reduce(
        (prev, cur) => ({ ...prev, [cur]: jsonCb(cur) }), {});
      console.timeEnd(`pathProjection ${type}`);
      yield put({ type, projected });
    } catch (err) {
      console.error('Error occurred in projecting', type);
      yield put({ type, projected: {}, error: err });
    }
  }

  const projection = yield select(getProjection);
  /* eslint-disable no-restricted-syntax */
  for (const [type, selector] of hasPoints) {
    // pointProjection
    console.time(`pointProjection ${type}`);
    const json = yield select(selector);
    const projected = Object.keys(json).reduce((prev, cur) => {
      const [x, y] = projection([json[cur].x, json[cur].y]);
      return { ...prev, [cur]: { id: cur, x, y } };
    }, {});
    console.timeEnd(`pointProjection ${type}`);
    yield put({ type, projected });
  }
  console.timeEnd('Change_Projection Saga');
  return true;
}

export default function* changeProjectionSaga() {
  yield takeEvery('CHANGE_PROJECTION_SAGA', changeProjection);
}
