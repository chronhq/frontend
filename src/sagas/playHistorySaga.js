/**
 * @file This saga is equal to simple setInterval() function
 * Every `yearInterval` dispatching `CHANGE_YEAR_SAGA`
 * Interval is taken from state.runtime.status.yearInterval
*/

import { put, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { nextYear } from '../reducers/actions';

export const getPlayingStatus = state => state.runtime.status.playing;
export const getYearInterval = state => state.runtime.status.yearInterval;

function* playTimer(action) {
  let playing = action.playing;
  while (playing === true) {
    const yearInterval = yield select(getYearInterval);
    playing = yield select(getPlayingStatus);
    if (playing === true) {
      yield put(nextYear());
      yield delay(yearInterval);
    }
  }
}

export default function* playTimerSaga() {
  yield takeEvery('START_STOP', playTimer);
}
