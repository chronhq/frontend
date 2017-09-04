/**
 * @file Catching every 'LOAD_DATA_SAGA' action.
 * Performing a request for an API server from `${action.resource}`
 * // Firing `${action.resource}_PENDING` before sending a request
 * Firing `${action.resource}_FULFILLED` if request was succeeded
 * Firing `${action.resource}_REJECTED` if request was rejected
 * _PENDING _FULFILLED _REJECTED is a legacy from redux-promise-middleware
 */

import fetch from 'isomorphic-fetch';
import { put, call, fork } from 'redux-saga/effects';

import { getUrlFromResource, defaultCb } from './processData/_helper';

import { getBorders, getBordersTimeline } from './processData/borders';
import projectTerrain from './processData/projectTerrain';
import persons from './processData/persons';
import inventions from './processData/inventions';
import geoEvents from './processData/geoEvents';
import locations from './processData/locations';
import properties from './processData/properties';
import courseTimelines from './processData/courseTimelines';


const headers = {
  method: 'GET',
  credentials: 'same-origin',
  headers: { 'Content-Type': 'application/json' }
};
const prefix = '/api';

function fetchResponse(url) {
  return fetch(url, headers).then(response => response.json());
}

function* defaultGenCb(res, resource, req) {
  const payload = yield call(defaultCb, res, req.key);
  // console.log('payload', resource, payload);
  yield put({ type: `${resource}_FULFILLED`, payload });
}

function* arrayGenCb(res = [], resource, req) {
  // req: { key: 'byId', id: 'id' }
  const keyData = res.reduce(
    (prev, row) => {
      const arr = prev[row[req.id]] ? prev[row[req.id]] : [];
      return { ...prev, [row[req.id]]: [...arr, row] };
    }, {}
  );
  const payload = { [req.key]: keyData };
  yield put({ type: `${resource}_FULFILLED`, payload });
}

const resourceToCb = {
  PERSONS: persons,
  TERRAIN: projectTerrain,
  PROPERTIES: properties,
  PROPERTIES_ADMIN: defaultGenCb,
  PROPERTIES_TYPE: defaultGenCb,
  LOCATIONS: locations,
  INVENTIONS: inventions,
  EVENTS_GEO: geoEvents,
  BORDERS: getBorders,
  BORDERS_TIMELINE: getBordersTimeline,
  COURSES: defaultGenCb,
  COURSE_TIMELINES: courseTimelines,
  COURSE_EVENTS: arrayGenCb,
  COURSE_TRACES: arrayGenCb,
};


function* executeRequest({ resource, req }) {
  const uri = getUrlFromResource(resource);
  const url = typeof (req.filter) !== 'undefined'
    ? `${prefix}/${uri}?filter=${req.filter}`
    : `${prefix}/${uri}`;

    // yield put({ type: `${resource}_PENDING` });
  console.log(url, resource);
  const urlCb = resourceToCb[resource] ? resourceToCb[resource] : defaultGenCb;
  try {
    const resp = yield call(fetchResponse, url);
    yield call(urlCb, resp, resource, req);
  } catch (e) {
    console.log('Error failed to execute request:', resource, req, url);
    console.error(e);
    yield put({ type: `${resource}_REJECTED`, payload: { error: e.message } });
  }
}

function* loadData({ fetchList }) {
  //  { type: 'LOAD_DATA_SAGA', fetchList: [
  //    {resource: 'BORDER', req: {filter: '', key: 'byId'}},
  //    {resource: 'INVENTIONS', req: {}},
  //   ... ]};
  // console.log('Wow, fetch list', fetchList);

  /* eslint-disable no-restricted-syntax */
  for (const item of fetchList) {
    if (typeof (item.req) === 'undefined') item.req = {};
    yield fork(executeRequest, item);
  }
}

export default loadData;
