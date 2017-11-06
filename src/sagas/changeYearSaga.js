/**
 * @file Validate year before send it to reducer
*/

import { put, takeEvery, select } from 'redux-saga/effects';
import { changeInitialYear } from '../reducers/actions';
import { initialState } from '../reducers/timeline/year';

const yearSelector = state => state.timeline.year;
function* changeYear(action) {
  const year = yield select(yearSelector);
  const getNow = () => {
    switch (action.action) {
      case 'NEXT_YEAR': {
        return year.now + 1;
      } case 'SET_YEAR': {
        return action.year;
      } case 'PREV_YEAR': {
        return year.now - 1;
      } case 'RESET_YEAR': {
        return year.min - 1;
      }
      default: {
        return typeof (year.now) !== 'undefined'
          ? year.now : year.min;
      }
    }
  };
  const now = getNow();
  const reset = year.min > now || now > year.max;
  const resp = reset === true
    ? { type: 'SET_YEAR', year: year.min }
    : { type: action.action, year: now };
  yield put(resp);
}

function* initTimeline(action) {
  if (action.ready === true) {
    const year = yield select(yearSelector);
    yield put({ type: 'SET_YEAR', year: year.min });
  } else {
    yield put(changeInitialYear(initialState));
    yield put({ type: 'SET_YEAR', year: initialState.min });
  }

}

export default function* changeYearSaga() {
  yield takeEvery('CHANGE_YEAR_SAGA', changeYear);
  yield takeEvery('CHANGE_STATUS', initTimeline);
}
