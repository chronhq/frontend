import { combineReducers } from 'redux';
import { newReducer } from '../_helper';

const props = newReducer('PROPERTIES', { properties: {} });
const propsAdmin = newReducer('PROPERTIES_ADMIN', { admin: {} });
const propsType = newReducer('PROPERTIES_TYPE', { type: {} });

export default combineReducers({ data: props, admin: propsAdmin, type: propsType });
