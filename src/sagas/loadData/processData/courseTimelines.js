import { put, call } from 'redux-saga/effects';

import { defaultCb } from './_helper';
// import { changeInitialYear } from '../../../reducers/actions';

function* courseTimelines(res, resource, req) {
  const payload = yield call(defaultCb, res, req.key, req.id);
  // yield put(changeInitialYear(findMinMax(payload.tick)));
  yield put({ type: `${resource}_FULFILLED`, payload });
}

export default courseTimelines;
