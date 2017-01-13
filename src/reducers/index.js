import { combineReducers } from 'redux';
import terrain from './terrain';
import timeline from './timeline';
import locations from './locations';
import persons from './persons';
import facts from './facts';

const mapInfoApp = combineReducers({
  facts,
  persons,
  locations,
  terrain,
  timeline
});

export default mapInfoApp;
