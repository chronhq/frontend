import { put, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export const getPlayingStatus = state => state.status.playing;
export const getYearInterval = state => state.status.yearInterval;

function* playTimer(action) {
  let playing = action.playing;
  while (playing === true) {
    const yearInterval = yield select(getYearInterval);
    playing = yield select(getPlayingStatus);
    yield delay(yearInterval);
    yield put({ type: 'NEXT_YEAR' });
  }
}

export default function* playTimerSaga() {
  yield takeEvery('START_STOP', playTimer);
}