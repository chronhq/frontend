import { combineReducers } from 'redux';

import { newDummyReducer } from '../_helper';
import inventionsReducer from './inventionsTimeline';
import layerReducer from './layerTimeline';

import year from './year';

const newReducer = newDummyReducer(layerReducer);
const newFactsReducer = newDummyReducer(inventionsReducer);

const dls = { current: [], byYear: {} };

const inventionsDefaultState = { REDUCER_NAME: 'INVENTIONS_TIMELINE', ...dls };
const layersDefaultState = {
  locations: { REDUCER_NAME: 'LOCATIONS_TIMELINE', ...dls },
  borders: { REDUCER_NAME: 'BORDERS_TIMELINE', current: '' },
  geoEvents: { REDUCER_NAME: 'EVENTS_GEO_TIMELINE', ...dls, current: '' },
  personsAlive: { REDUCER_NAME: 'PERSONS_TIMELINE', ...dls },
  personsFacts: { REDUCER_NAME: 'PERSONS_FACTS_TIMELINE', ...dls }
};
const layers = Object.keys(layersDefaultState).reduce(
  (prev, cur) => ({ ...prev, [cur]: newReducer('', layersDefaultState[cur]) }), {});
const inventions = newFactsReducer('', inventionsDefaultState);

export default combineReducers({ ...layers, inventions, year });
