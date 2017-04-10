import { combineReducers } from 'redux';
import borders from './borders';
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
const propertiesDefaultState = {
  loaded: false,
  REDUCER_NAME: 'PROPERTIES',
  properties: {}
};
const propertiesAdminDefaultState = {
  loaded: false,
  REDUCER_NAME: 'PROPERTIES_ADMIN',
  admin: {}
};
const propertiesTypeDefaultState = {
  loaded: false,
  REDUCER_NAME: 'PROPERTIES_TYPE',
  type: {}
};
const surveysDefault = {
  loaded: false,
  REDUCER_NAME: 'SURVEYS',
  byId: {}
};

const locations = (
  state = locationDefaultState, action) => genericReducer(state, action);
const terrain = (
  state = terrainDefaultState, action) => genericReducer(state, action);
const facts = (
  state = factsDefaultState, action) => genericReducer(state, action);
const persons = (
  state = personsDefaultState, action) => genericReducer(state, action);
const props = (
  state = propertiesDefaultState, action) => genericReducer(state, action);
const propsAdmin = (
  state = propertiesAdminDefaultState, action) => genericReducer(state, action);
const propsType = (
  state = propertiesTypeDefaultState, action) => genericReducer(state, action);
const surveys = (
  state = surveysDefault, action) => genericReducer(state, action);


const mapInfoApp = combineReducers({
  mapView,
  status,
  locations,
  facts,
  persons,
  projection,
  properties: combineReducers({ data: props, admin: propsAdmin, type: propsType }),
  surveys,
  borders,
  terrain,
  timeline,
  visibility
});

export default mapInfoApp;
