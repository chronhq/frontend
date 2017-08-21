import { put, select } from 'redux-saga/effects';
import { geoEventsFF } from '../../../reducers/actions';
import { projectionSelector, defaultCb, projectLocations } from './_helper';


function* geoEvents(res, resource, req) {
  const data = defaultCb(res, req.key);
  const projection = yield select(projectionSelector);
  const project = projection.project;
  const projected = projectLocations(res, project);
  yield put({ type: 'EVENTS_GEO_FULFILLED', payload: { ...data, projected } });

  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    const year = Number(cur.date.replace(/-.*/g, ''));
    return cur.inventDate in prev
      ? { ...prev, [year]: [...prev[year], cur.id] }
      : { ...prev, [year]: [cur.id] };
  }, {});
  yield put(geoEventsFF(byYear));
}

export default geoEvents;
