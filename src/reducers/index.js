import { combineReducers } from 'redux';
import borders from './borders';
import timeline from './timeline';
import genericReducer from './generic';
import projection from './projection';
import visibility from './visibility';
import status from './status';
import mapView from './mapView';

const getReducerState = (name, fields) => ({
  loaded: false,
  REDUCER_NAME: name,
  ...fields
});
const newReducer = (name, fields) =>
  (state = getReducerState(name, fields), action) =>
    genericReducer(state, action);


const locations = newReducer('LOCATIONS', { places: {} });
const terrain = newReducer('TERRAIN', { byId: {}, projected: {} });
const facts = newReducer('FACTS', { byId: {} });
const persons = newReducer('PERSONS', { byId: {} });
const personsFacts = newReducer('PERSONS_FACTS', { byId: {} });
const props = newReducer('PROPERTIES', { properties: {} });
const propsAdmin = newReducer('PROPERTIES_ADMIN', { admin: {} });
const propsType = newReducer('PROPERTIES_TYPE', { type: {} });
const surveys = newReducer('SURVEYS', { byId: {} });
const answers = newReducer('SURVEYS_ANSWER', {});
const geoEvents = newReducer('EVENTS_GEO', { byId: {} });

const mapInfoApp = combineReducers({
  mapView,
  status,
  locations,
  facts,
  geoEvents,
  persons,
  personsFacts,
  projection,
  properties: combineReducers({ data: props, admin: propsAdmin, type: propsType }),
  surveys,
  answers,
  borders,
  terrain,
  timeline,
  visibility
});

export default mapInfoApp;
