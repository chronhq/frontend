import { put, select } from 'redux-saga/effects';
import {
  getNextData,
  getActualData,
  loadData } from '../../reducers/actions';

export function getIdsFromTimeline(type, t, loaded = {}) {
  // type must be geo or props
  return Object.keys(t).reduce(
    (prev, cur) => (t[cur][type] in loaded
      ? prev
      : [...prev, { id: t[cur][type] }])
    , []
  );
}

export const getProjection = state => ({
  name: state.runtime.projection.name,
  rotate: state.runtime.projection.rotate
});

export const getTimelineBorders = state => state.timeline.borders;
export const getLoadedGeometry = state => state.data.borders;
export const getCurrentYear = state => state.timeline.year.now;

const separate = (arr) => {
  // split array of geoIds into multiple arrays with setted max elements
  const maxIdsInReq = 15;
  const count = Math.ceil(arr.length / maxIdsInReq);
  const s = new Array(count);
  return s.map((cur, idx) => {
    const start = maxIdsInReq * idx;
    const stop = maxIdsInReq * (idx + 1);
    return arr.slice(start, stop);
  });
};

function* loadGeoData(action) {
  // console.time('Loading GeoData Saga');
  const geometryData = yield select(getLoadedGeometry);
  const loadedGeometry = geometryData.byId;
  const year = {};
  const projection = yield select(getProjection);
  const borders = yield select(getTimelineBorders);
  year.cur = yield select(getCurrentYear);

  if (action.type === 'NEXT_YEAR') year.target = year.cur + 1;
  else if (action.type === 'PREV_YEAR') year.target = year.cur - 1;
  else if (action.type === 'SET_YEAR') year.target = action.year;
  else if (typeof (year.cur) === 'undefined') year.target = year.min;
  else year.target = year.cur;

  const actualData = getActualData(borders.allYears, borders.byYear, year.target, action.type);
  const additionalData = action.type === 'NEXT_YEAR'
    ? getNextData(borders.allYears, borders.byYear, year.target)
    // BORDERS_TIMELINE_FULFILLED or SET_YEAR or PREV_YEAR
    : {};
  const dataToLoad = { ...actualData, ...additionalData };
  const geoIds = getIdsFromTimeline('geo', dataToLoad, loadedGeometry);
  // Loading new geometry
  if (geoIds.length > 0 && geometryData.loading === false) {
    // console.log('Asking for geo ids', geoIds);
    const listOfIds = separate(geoIds);
    /* eslint-disable no-restricted-syntax */
    for (const or of listOfIds) {
      yield put(loadData([{
        resource: 'BORDERS',
        req: {
          cb: projection,
          filter: JSON.stringify({
            where: { or }
          })
        }
      }]));
    }
  }

  // console.timeEnd('Loading GeoData Saga');
}

export default loadGeoData;
