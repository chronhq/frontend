import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import throttleFactSelection from './throttleFactSelectionSaga';
import loadData from './loadData';
import playHistory from './playHistorySaga';
import exportFromFeed from './exportFromFeedSaga';
import prepareBordersProps from './prepareBordersPropsSaga';
import changeYear from './changeYearSaga';


export default [
  throttleFactSelection,
  loadData,
  mapView,
  playHistory,
  changeProjection,
  exportFromFeed,
  prepareBordersProps,
  changeYear,
  assignTimelineCurrent
];

