import { combineReducers } from 'redux';

import visibility from './visibility';
import status from './status';
import mapView from './mapView';
import bordersData from './bordersData';

export default combineReducers({ visibility, status, mapView, bordersData });