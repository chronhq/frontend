import { put, select, call } from 'redux-saga/effects';
import { projectionSelector } from './_helper';
import loadGeoData from '../loadGeoData';


export function* getBordersTimeline(data) {
  const timeline = data.reduce((prev, row) => {
    const d = { [row.id]: { geo: row.geo, props: row.props } };
    if (row.year in prev) {
      return { ...prev,
        [row.year]: { ...prev[row.year], ...d }
      };
    }
    return { ...prev, [row.year]: d };
  }, {});
  const payload = {
    byYear: timeline,
    allYears: Object.keys(timeline)
  };
  const action = { type: 'BORDERS_TIMELINE_FULFILLED', payload };
  yield put(action);
  yield call(loadGeoData, action);
}

export function* getBorders(data) {
  const projection = yield select(projectionSelector);
  const pathFn = projection.path;
  const payload = data.reduce(
    (prev, row) => ({
      byId: { ...prev.byId, [row.id]: row.geometry },
      projected: { ...prev.projected, [row.id]: pathFn(row.geometry) }
    }), { byId: {}, projected: {} });
  yield put({ type: 'BORDERS_FULFILLED', payload });
}
