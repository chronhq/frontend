import changeProjection from './changeProjectionSaga';
import assignTimelineCurrent from './assignTimelineCurrentSaga';
import mapView from './mapViewSaga';
import throttleFactSelection from './throttleFactSelectionSaga';
import processAndLoadData from './processAndLoadData';
import playHistory from './playHistorySaga';
import exportFromFeed from './exportFromFeedSaga';
import askBackend from './askBackendSaga';
import prepareBordersProps from './prepareBordersPropsSaga';
import changeYear from './changeYearSaga';


export default [
  throttleFactSelection,
  processAndLoadData,
  mapView,
  playHistory,
  changeProjection,
  exportFromFeed,
  askBackend,
  prepareBordersProps,
  changeYear,
  assignTimelineCurrent
];

