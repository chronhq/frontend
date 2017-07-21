import { combineReducers } from 'redux';
import borders from './borders';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';
import runtime from './runtime';
import { newDummyReducer } from './_helper';

const newReducer = newDummyReducer(genericReducer);

const locations = newReducer('LOCATIONS', { places: {} });
const terrain = newReducer('TERRAIN', { byId: {}, projected: {} });
const facts = newReducer('FACTS', { byId: {} });
const persons = newReducer('PERSONS', { byId: {} });
const personsFacts = newReducer('PERSONS_FACTS', { byId: {} });
const props = newReducer('PROPERTIES', { properties: {} });
const propsAdmin = newReducer('PROPERTIES_ADMIN', { admin: {} });
const propsType = newReducer('PROPERTIES_TYPE', { type: {} });
const geoEvents = newReducer('EVENTS_GEO', { byId: {}, projected: {} });

const mapInfoApp = combineReducers({
  locations,
  facts,
  geoEvents,
  persons,
  personsFacts,
  projection,
  properties: combineReducers({ data: props, admin: propsAdmin, type: propsType }),
  borders,
  terrain,
  timeline,
  runtime,
});

export default mapInfoApp;
