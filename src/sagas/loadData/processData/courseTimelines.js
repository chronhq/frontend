import { put, call } from 'redux-saga/effects';

import { defaultCb } from './_helper';
import { changeInitialYear } from '../../../reducers/actions';

const findMinMax = (ticks) => {
  const years = Object.keys(ticks).map(t => ticks[t].year);
  const min = Math.min(...years);
  const max = Math.max(...years);
  const tick = Math.min(...Object.keys(ticks).map(t => Number(ticks[t].tick)));
  const now = ticks[tick].year;
  return { tick, now, min, max };
};

function* courseTimelines(res, resource, req) {
  const payload = yield call(defaultCb, res, req.key, req.id);
  yield put(changeInitialYear(findMinMax(payload.tick)));
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default courseTimelines;
