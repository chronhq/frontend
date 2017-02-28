import { put, takeEvery, select } from 'redux-saga/effects';

export const getProjectionConfig = state => state.projection;
export const getPath = state => state.projection.path;
export const getProjection = state => state.projection.project;

export const awaitingNewPath = [
  ['TERRAIN_PROJECTED', state => state.terrain.byContinent],
  ['BORDERS_PROJECTED', state => state.borders.byYear]
];
export const hasPoints = [
  ['LOCATIONS_PROJECTED', state => state.locations.places]
];

function* changeProjection() {
  console.time('Change_Projection Saga');
  const path = yield select(getPath);
  for (const [type, selector] of awaitingNewPath) {
    // pathProjection
    console.time(`pathProjection ${type}`);
    const json = yield select(selector);
    const projected = Object.keys(json).reduce((prev, cur) => {
      return { ...prev, [cur]: path(json[cur]) };
    }, {});
    console.timeEnd(`pathProjection ${type}`);
    yield put({ type, projected });
  }

  const projection = yield select(getProjection);
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
}

export default function* changeProjectionSaga() {
  yield takeEvery('CHANGE_PROJECTION', changeProjection);
}

