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

function* changeProjection(action) {
  console.time('Change_Projection Saga');
  // Validate if there is a need to project a data
  const prevProjection = yield select(getProjectionConfig);
  if (action.name === prevProjection.name
  && action.rotate[0] === prevProjection.rotate[0]
  && action.rotate[1] === prevProjection.rotate[1]
  && action.rotate[2] === prevProjection.rotate[2]) {
    console.timeEnd('Change_Projection Saga');
    return false;
  }
  // Save new data
  yield put({ ...action, type: 'CHANGE_PROJECTION_SAGA' });

  const path = yield select(getPath);
  for (const [type, selector] of awaitingNewPath) {
    // pathProjection
    console.time(`pathProjection ${type}`);
    const json = yield select(selector);
    const projected = Object.keys(json).reduce((prev, cur) => {
      return { ...prev, [cur]: json[cur]
          .features.reduce(
            (prevFeature, curFeature) => [...prevFeature, path(curFeature)],
          []) };
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
  return true;
}

export default function* changeProjectionSaga() {
  yield takeEvery('CHANGE_PROJECTION', changeProjection);
}



