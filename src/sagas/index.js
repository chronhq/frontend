import changeProjectionSaga from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';

export default [
  mapView,
  changeProjectionSaga,
  assignTimelineCurrent
];

