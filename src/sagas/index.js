import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import throttleFactSelection from './throttleFactSelectionSaga';
import whenDataIsLoaded from './whenDataIsLoadedSaga';

export default [
  throttleFactSelection,
  whenDataIsLoaded,
  mapView,
  changeProjection,
  assignTimelineCurrent
];

