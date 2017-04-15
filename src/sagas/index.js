import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import throttleFactSelection from './throttleFactSelectionSaga';
import processAndLoadData from './processAndLoadData';
import playHistory from './playHistorySaga';
import exportFromFeed from './exportFromFeedSaga';


export default [
  throttleFactSelection,
  processAndLoadData,
  mapView,
  playHistory,
  changeProjection,
  exportFromFeed,
  assignTimelineCurrent
];

