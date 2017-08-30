import { combineReducers } from 'redux';
import borders from './borders';
import properties from './properties';
import { newReducer } from '../_helper';

const locations = newReducer('LOCATIONS', { places: {}, projected: {} });
const terrain = newReducer('TERRAIN', { byId: {}, projected: {} });
const inventions = newReducer('INVENTIONS', { byId: {} });
const persons = newReducer('PERSONS', { byId: {} });
const personsFacts = newReducer('PERSONS_FACTS', { byId: {} });
const geoEvents = newReducer('EVENTS_GEO', { byId: {}, projected: {} });

export default combineReducers({
  locations,
  inventions,
  geoEvents,
  persons,
  personsFacts,
  properties,
  borders,
  terrain,
});
