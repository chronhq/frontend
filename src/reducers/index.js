import { combineReducers } from 'redux';
import timeline from './timeline';

import * as techData from '../data/tech';
import terrainState from '../data/svg';

const facts = (state = techData.getFactsData()) => state;
const persons = (state = techData.getPeople()) => state;
const locations = (state = techData.getLocations()) => state;
const borders = (state = techData.getBordersData()) => state;
const territories = (state = techData.getTerritoriesData()) => state;

const terrain = (state = terrainState) => state;

const mapInfoApp = combineReducers({
  facts,
  persons,
  locations,
  borders,
  territories,
  terrain,
  timeline
});

export default mapInfoApp;
