import { combineReducers } from 'redux';
import timeline from './timeline';
import locations from './locations';
import terrain from './terrain';

import * as techData from '../data/tech';

const facts = (state = techData.getFactsData()) => state;
const persons = (state = techData.getPeople()) => state;
const borders = (state = techData.getBordersData()) => state;
const territories = (state = techData.getTerritoriesData()) => state;

const mapInfoApp = combineReducers({
  locations,
  facts,
  persons,
  borders,
  territories,
  terrain,
  timeline
});

export default mapInfoApp;
