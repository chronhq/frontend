import { combineReducers } from 'redux';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';

import * as techData from '../data/tech';

const locationDefaultState = { loaded: false, type: 'LOCATIONS', places: {}, allIds: [] };
const terrainDefaultState = { loaded: false, type: 'TERRAIN', topology: {} };

const locations = (state = locationDefaultState, action) => genericReducer(state, action);
const terrain = (state = terrainDefaultState, action) => genericReducer(state, action);

const facts = (state = techData.getFactsData()) => state;
const persons = (state = techData.getPeople()) => state;
const borders = (state = techData.getBordersData()) => state;
const territories = (state = techData.getTerritoriesData()) => state;

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
