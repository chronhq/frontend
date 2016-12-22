import { combineReducers } from 'redux';
import terrain from './terrain';
import timeline from './timeline';

const mapInfoApp = combineReducers({
  terrain,
  timeline
});

export default mapInfoApp;
