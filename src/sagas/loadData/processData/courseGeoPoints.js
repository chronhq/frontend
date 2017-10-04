import { put, select } from 'redux-saga/effects';
import { projectionSelector, projectLocations } from './_helper';

const projectRow = (row, projection) => {
  // prepare data
  const data = [{ id: 0, x: row.geopoint[0], y: row.geopoint[1] }];
  // obtain projected data
  const prj = projectLocations(data, projection.project, projection.clip);
  return { ...row, projected: prj[0] };
};

function* courseGeoPoints(res = [], resource, req) {
  // req: { key: 'byId', id: 'id' }
  const projection = yield select(projectionSelector);
  const keyData = res.reduce(
    (prev, row) => {
      const arr = prev[row[req.id]] ? prev[row[req.id]] : [];
      return { ...prev, [row[req.id]]: [...arr, projectRow(row, projection)] };
      // return { ...prev, [row[req.id]]: projectRow(row, projection) }
    }, {}
  );
  const payload = { [req.key]: keyData };
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default courseGeoPoints;
