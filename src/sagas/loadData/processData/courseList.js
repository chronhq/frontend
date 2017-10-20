import { put, select } from 'redux-saga/effects';
import { projectionSelector } from './_helper';
import { calculateProjection } from '../../../reducers/runtime/projection';

function* courseListGenCb(res, resource) {
  // const payload = yield call(courseListCb, res, req.key);
  const projection = yield select(projectionSelector);
  const keyData = res.reduce(
    (prev, row) => {
      const newProjection = calculateProjection(projection, row.config.projection);
      const points = row.config.projection.clip.map(newProjection.project);
      const projected = {
        topLeft: points[0],
        bottomRight: points[1],
        mapWidth: points[1][0] - points[0][0],
        mapHeight: points[1][1] - points[0][1]
      };
      return { ...prev, [row.id]: { ...row, projected } };
    }, {});
  const payload = { byId: keyData };
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default courseListGenCb;
