import { combineReducers } from 'redux';

import { newReducer } from '../_helper';

const list = newReducer('COURSES', { byId: {} });
const events = newReducer('COURSE_EVENTS', { byId: {} });
const timeline = newReducer('COURSE_TIMELINES', { byId: {} });
const traces = newReducer('COURSE_TRACES', { byId: {} });

export default combineReducers({list, events, timeline, traces});
