import { combineReducers } from 'redux';

import visibility from './visibility';
import status from './status';
import mapView from './mapView';
import bordersData from './bordersData';
import projection from './projection';
import landOwnershipColors from './landOwnershipColors';

export default combineReducers({
  landOwnershipColors,
  projection,
  visibility,
  status,
  mapView,
  bordersData
});