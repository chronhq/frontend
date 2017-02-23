import { combineReducers } from 'redux';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';

const locationDefaultState = {
  loaded: false,
  type: 'LOCATIONS',
  places: {},
  allIds: []
};
const terrainDefaultState = {
  loaded: false,
  type: 'TERRAIN',
  topology: {}
};
const bordersDefaultState = {
  loaded: false,
  type: 'BORDERS',
  byYear: {}
};
const factsDefaultState = {
  loaded: false,
  type: 'FACTS',
  allIds: {},
};
const personsDefaultState = {
  loaded: false,
  type: 'PERSONS',
  allIds: {},
  byId: {}
};

const locations = (state = locationDefaultState, action) => genericReducer(state, action);
const terrain = (state = terrainDefaultState, action) => genericReducer(state, action);
const borders = (state = bordersDefaultState, action) => genericReducer(state, action);
const facts = (state = factsDefaultState, action) => genericReducer(state, action);
const persons = (state = personsDefaultState, action) => genericReducer(state, action);

const mapInfoApp = combineReducers({
  locations,
  facts,
  persons,
  projection,
  borders,
  terrain,
  timeline
});

export default mapInfoApp;
