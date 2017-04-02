import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import loadGeoData from './loadGeoDataSaga';

export default [
  loadGeoData,
  mapView,
  changeProjection,
  assignTimelineCurrent
];

