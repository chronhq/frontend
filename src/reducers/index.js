import { combineReducers } from 'redux';

import timeline from './timeline';
import data from './data';
import runtime from './runtime';
import courses from './courses';
import flags from './flags';

const mapInfoApp = combineReducers({
  data,
  timeline,
  runtime,
  courses,
  flags,
});

export default mapInfoApp;
