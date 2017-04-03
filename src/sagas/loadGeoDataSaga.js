import { put, takeEvery, select } from 'redux-saga/effects';
import { getNextData, getActualData, askBackend } from '../reducers/actions';

export const getProjection = state => ({
  name: state.projection.name,
  rotate: state.projection.rotate
});

export const getTimelineBorders = state => state.timeline.borders;
export const getLoadedGeometry = state => state.borders;

export const getCurrentYear = state => state.timeline.now;

export function getIdsFromTimeline(type, t, loaded = {}) {
  // type must be geo or props
  return Object.keys(t).reduce(
    (prev, cur) => (t[cur][type] in loaded ? prev : [...prev, t[cur][type]])
    , []
  );
}

function* loadGeoData(action) {
  console.time('Loading GeoData Saga');
  const geometryData = yield select(getLoadedGeometry);
  const loadedGeometry = geometryData.byYear;

  const projection = yield select(getProjection);
  const borders = yield select(getTimelineBorders);
  const targetYear = yield select(getCurrentYear);
  const dataToLoad = action.type === 'NEXT_YEAR'
    ? getNextData(borders.allYears, borders.byYear, targetYear)
    // BORDERS_TIMELINE_FULFILLED or SET_YEAR
    : getActualData(borders.allYears, borders.byYear, targetYear);
  const geoIds = getIdsFromTimeline('geo', dataToLoad, loadedGeometry);
  // Loading new geometry
  if (geoIds.length > 0 && geometryData.loading === false) {
    console.log('Asking for geo ids', geoIds);
    yield put(askBackend('BORDERS', {
      projection,
      ids: geoIds
    }));
  } else {
    console.log('Nothing new to obtain from server');
  }

  console.timeEnd('Loading GeoData Saga');
}

export default function* loadGeoDataSaga() {
  yield takeEvery('BORDERS_TIMELINE_FULFILLED', loadGeoData);
  yield takeEvery('SET_YEAR', loadGeoData);
  yield takeEvery('NEXT_YEAR', loadGeoData);
}
