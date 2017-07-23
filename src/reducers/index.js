import { combineReducers } from 'redux';

import timeline from './timeline';
import data from './data';
import runtime from './runtime';

const mapInfoApp = combineReducers({
  data,
  timeline,
  runtime,
});

export default mapInfoApp;
