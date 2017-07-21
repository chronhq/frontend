import { combineReducers } from 'redux';

import { newDummyReducer } from '../_helper'
import factsReducer from './factsTimeline';
import layerReducer from './layerTimeline';

import year from './year';

const newReducer = newDummyReducer(layerReducer);
const newFactsReducer = newDummyReducer(factsReducer);

const dls = { current: [], byYear: {} };

const factsDefaultState = { REDUCER_NAME: 'FACTS_TIMELINE', ...dls };
const layersDefaultState = {
  locations: { REDUCER_NAME: 'LOCATIONS_TIMELINE', ...dls  },
  borders: { REDUCER_NAME: 'BORDERS_TIMELINE', ...dls, current: '' },
  geoEvents: { REDUCER_NAME: 'EVENTS_GEO_TIMELINE', ...dls, current: '' },
  personsAlive: { REDUCER_NAME: 'PERSONS_TIMELINE', ...dls },
  personsFacts: { REDUCER_NAME: 'PERSONS_FACTS_TIMELINE', ...dls }
};
const layers = Object.keys(layersDefaultState).reduce(
  (prev, cur) => ({ ...prev, [cur]: newReducer('', layersDefaultState[cur]) }), {});
const facts = newFactsReducer('', factsDefaultState);

export default combineReducers({ ...layers, facts, year });