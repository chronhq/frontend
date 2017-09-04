import { put, select } from 'redux-saga/effects';
import { projectionSelector, projectLocations } from './_helper';

const projectRow = (row, projection) => {
  // prepare data
  const data = row.path.map((point, id) => ({ id, x: point.lng, y: point.lat }));
  // obtain projected data
  const prj = projectLocations(data, projection.project, projection.clip);
  // flatten Object by id into array of points
  const projected = Object.keys(prj).map(p => [prj[p].x, prj[p].y]);
  return { ...row, projected };
}
function* courseTraces(res = [], resource, req) {
  // req: { key: 'byId', id: 'id' }
  const projection = yield select(projectionSelector);
  const keyData = res.reduce(
    (prev, row) => {
      const arr = prev[row[req.id]] ? prev[row[req.id]] : [];
      return { ...prev, [row[req.id]]: [...arr, projectRow(row, projection)] };
    }, {}
  );
  const payload = { [req.key]: keyData };
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default courseTraces;
