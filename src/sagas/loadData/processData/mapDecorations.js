import { put, select } from 'redux-saga/effects';
import { projectionSelector, projectLocations } from './_helper';

const projectRow = (row, projection) => {
  // prepare data
  const data = [{ id: 0, x: row.geopoint[0], y: row.geopoint[1] }];
  // obtain projected data
  const prj = projectLocations(data, projection.project, projection.clip);
  return { ...row, projected: prj[0] };
};

function* mapDecorations(res = [], resource) {
  // req: { key: 'byId', id: 'id' }
  const projection = yield select(projectionSelector);
  const keyData = res.reduce(
    (prev, row) => ({ ...prev, [row.id]: projectRow(row, projection) }), {}
  );
  const payload = { byId: keyData };
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default mapDecorations;
