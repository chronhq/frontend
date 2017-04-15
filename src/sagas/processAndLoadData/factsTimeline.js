import { put } from 'redux-saga/effects';

function* factsTimeline(action) {
  const data = action.payload;
  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    return cur.invent_date in prev
      ? { ...prev, [cur.invent_date]: [...prev[cur.invent_date], cur.id] }
      : { ...prev, [cur.invent_date]: [cur.id] };
  }, {});
  yield put({
    type: 'FACTS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  });
}

export default factsTimeline;
