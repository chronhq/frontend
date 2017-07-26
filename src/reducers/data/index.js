import { combineReducers } from 'redux';
import borders from './borders';
import properties from './properties';
import { newReducer } from '../_helper';

const locations = newReducer('LOCATIONS', { places: {} });
const terrain = newReducer('TERRAIN', { byId: {}, projected: {} });
const facts = newReducer('FACTS', { byId: {} });
const persons = newReducer('PERSONS', { byId: {} });
const personsFacts = newReducer('PERSONS_FACTS', { byId: {} });
const geoEvents = newReducer('EVENTS_GEO', { byId: {}, projected: {} });

export default combineReducers({
  locations,
  facts,
  geoEvents,
  persons,
  personsFacts,
  properties,
  borders,
  terrain,
});
