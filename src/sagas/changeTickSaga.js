import { put, takeEvery, select } from 'redux-saga/effects';
import { setYear } from '../reducers/actions';

const ticksSelector = state => state.courses.timeline.tick;
const yearSelector = state => state.timeline.year;

function* changeTick(action) {
  const ticks = yield select(ticksSelector);
  const tick = ticks[action.tick];
  const year = yield select(yearSelector);
  if (tick.year !== year) {
    yield put(setYear(tick.year));
  }
}

export default function* changeTickSaga() {
  yield takeEvery('CHANGE_TICK', changeTick);
}
