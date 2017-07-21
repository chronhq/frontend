import { put, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export const getPlayingStatus = state => state.runtime.status.playing;
export const getYearInterval = state => state.runtime.status.yearInterval;

function* playTimer(action) {
  let playing = action.playing;
  while (playing === true) {
    const yearInterval = yield select(getYearInterval);
    playing = yield select(getPlayingStatus);
    if (playing === true) {
      yield put({ type: 'CHANGE_YEAR_SAGA', action: 'NEXT_YEAR' });
      yield delay(yearInterval);
    }
  }
}

export default function* playTimerSaga() {
  yield takeEvery('START_STOP', playTimer);
}