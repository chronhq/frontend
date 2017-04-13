import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import throttleFactSelection from './throttleFactSelectionSaga';
import whenDataIsLoaded from './whenDataIsLoadedSaga';
import playHistory from './playHistorySaga';
import exportFromFeed from './exportFromFeedSaga';


export default [
  throttleFactSelection,
  whenDataIsLoaded,
  mapView,
  playHistory,
  changeProjection,
  exportFromFeed,
  assignTimelineCurrent
];

