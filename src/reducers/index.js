import { combineReducers } from 'redux';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';

const locationDefaultState = { loaded: false, type: 'LOCATIONS', places: {}, allIds: [] };
const terrainDefaultState = { loaded: false, type: 'TERRAIN', topology: {} };

const locations = (state = locationDefaultState, action) => genericReducer(state, action);
const terrain = (state = terrainDefaultState, action) => genericReducer(state, action);

const factsDefaultState = { loaded: false, type: 'FACTS', allIds: {}, byId: {} };
const personsDefaultState = { loaded: false, type: 'PERSONS', allIds: {}, byId: {} };
const bordersDefaultState = { loaded: false, type: 'BORDERS', allIds: {}, byId: {} };
const territoriesDefaultState = { loaded: false, type: 'TERRITORIES', allIds: {}, byId: {} };

const facts = (state = factsDefaultState, action) => genericReducer(state, action);
const persons = (state = personsDefaultState, action) => genericReducer(state, action);
const borders = (state = bordersDefaultState, action) => genericReducer(state, action);
const territories = (state = territoriesDefaultState, action) => genericReducer(state, action);


const mapInfoApp = combineReducers({
  locations,
  facts,
  persons,
  projection,
  borders,
  territories,
  terrain,
  timeline
});

export default mapInfoApp;
