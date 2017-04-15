import { put } from 'redux-saga/effects';

function* geoEventsTimeline(action) {
  const data = action.payload;
  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    const year = Number(cur.date.replace(/-.*/g, ''));
    return cur.invent_date in prev
      ? { ...prev, [year]: [...prev[year], cur.id] }
      : { ...prev, [year]: [cur.id] };
  }, {});
  yield put({
    type: 'EVENTS_GEO_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  });
}

export default geoEventsTimeline;
