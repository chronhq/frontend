import { put, select } from 'redux-saga/effects';
import { projectionSelector, projectLocations } from './_helper';

const projectRow = (row, projection) => {
  // Iterate over path chunks
  const d = row.path.map((chunk) => {
    // prepare data
    const data = chunk.path.map((point, id) => ({ id, x: point[0], y: point[1] }));
    // obtain projected data
    const prj = projectLocations(data, projection.project, projection.clip);
    // flatten Object by id into array of points
    const projected = Object.keys(prj).map(p => [prj[p].x, prj[p].y]);
    return { projected, type: chunk.type };
  });
  return { ...row, projected: d };
};

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
