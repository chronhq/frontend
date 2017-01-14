import { combineReducers } from 'redux';
import terrain from './terrain';
import timeline from './timeline';
// import locations from './locations';
// import persons from './persons';
// import facts from './facts';

import * as techData from '../data/tech';

const facts = (state = techData.getFactsData(), action) => { return state; };
const persons = (state = techData.getPeople(), action) => { return state; };
const locations = (state = techData.getLocations(), action) => { return state; };
const borders = (state = techData.getBordersData(), action) => { return state; };
const borderAssigment = (state = techData.getBorderToCountry(), action) => { return state; };
const territories = (state = techData.getTerritoriesData(), action) => { return state; };

const mapInfoApp = combineReducers({
  test: 'pass',
  facts,
  persons,
  locations,
  borders,
  borderAssigment,
  territories,
  terrain,
  timeline
});

export default mapInfoApp;
