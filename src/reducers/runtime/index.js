import { combineReducers } from 'redux';

import visibility from './visibility';
import status from './status';
import mapView from './mapView';
import bordersData from './bordersData';
import projection from './projection';
import colorsData from './colorsData';

export default combineReducers({
  colorsData,
  projection,
  visibility,
  status,
  mapView,
  bordersData
});
