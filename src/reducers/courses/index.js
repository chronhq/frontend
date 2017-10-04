import { combineReducers } from 'redux';

import { newReducer } from '../_helper';

const list = newReducer('COURSES', { byId: {} });
const events = newReducer('COURSE_EVENTS', { tick: {} });
const timeline = newReducer('COURSE_TIMELINES', { tick: {} });
const traces = newReducer('COURSE_TRACES', { tick: {} });
const geoPoints = newReducer('COURSE_GEOPOINTS', { tick: {} });

export default combineReducers({ list, events, timeline, traces, geoPoints });
