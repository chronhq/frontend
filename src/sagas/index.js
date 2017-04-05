import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import whenDataIsLoaded from './whenDataIsLoadedSaga';

export default [
  whenDataIsLoaded,
  mapView,
  changeProjection,
  assignTimelineCurrent
];

