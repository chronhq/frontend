import { combineReducers } from 'redux';

import timeline from './timeline';
import data from './data';
import runtime from './runtime';
import flags from './flags';

const mapInfoApp = combineReducers({
  data,
  timeline,
  runtime,
  flags,
});

export default mapInfoApp;
