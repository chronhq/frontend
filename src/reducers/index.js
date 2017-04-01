import { combineReducers } from 'redux';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';
import visibility from './visibility';
import status from './status';
import mapView from './mapView';

const locationDefaultState = {
  loaded: false,
  REDUCER_NAME: 'LOCATIONS',
  places: {},
  allIds: []
};
const terrainDefaultState = {
  loaded: false,
  REDUCER_NAME: 'TERRAIN',
  byContinent: {},
  projected: {}
};
const bordersDefaultState = {
  loaded: false,
  REDUCER_NAME: 'BORDERS',
  byYear: {},
  projected: {}
};
const factsDefaultState = {
  loaded: false,
  REDUCER_NAME: 'FACTS',
  byId: {}
};
const personsDefaultState = {
  loaded: false,
  REDUCER_NAME: 'PERSONS',
  byId: {}
};

const locations = (
  state = locationDefaultState, action) => genericReducer(state, action);
const terrain = (
  state = terrainDefaultState, action) => genericReducer(state, action);
const borders = (
  state = bordersDefaultState, action) => genericReducer(state, action);
const facts = (
  state = factsDefaultState, action) => genericReducer(state, action);
const persons = (
  state = personsDefaultState, action) => genericReducer(state, action);

const mapInfoApp = combineReducers({
  mapView,
  status,
  locations,
  facts,
  persons,
  projection,
  borders,
  terrain,
  timeline,
  visibility
});

export default mapInfoApp;
