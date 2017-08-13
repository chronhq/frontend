/**
 * @file Catching every 'ASK_BACKEND_SAGA' action.
 * Performing a request for an API server from `${action.resource}`
 * Firing `${action.resource}_PENDING` before sending a request
 * Firing `${action.resource}_FULFILLED` if request was succeeded
 * Firing `${action.resource}_REJECTED` if request was rejected
 * _PENDING _FULFILLED _REJECTED is a legacy from redux-promise-middleware
 */

import fetch from 'isomorphic-fetch';
import { put, takeEvery, call } from 'redux-saga/effects';
import { getUrlFromResource, getCbFromResource } from './askBackendCallbacks';

function fetchResponse(url, req) {
  return fetch(url, req).then(response => response.json());
}

function* askBackend({ resource, data }) {
  const uri = getUrlFromResource(resource);
  const prefix = '/api';
  const url = typeof (data.filter) !== 'undefined'
    ? `${prefix}/${uri}?filter=${data.filter}`
    : `${prefix}/${uri}`;

  const cbPayload = getCbFromResource(resource);

  const req = {
    method: 'GET',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  };

  yield put({ type: `${resource}_PENDING` });
  try {
    const resp = yield call(fetchResponse, url, req);
    const payload = cbPayload(resp, data.cb);
    yield put({ type: `${resource}_FULFILLED`, payload });
  } catch (e) {
    yield put({ type: `${resource}_REJECTED`, payload: { error: e.message } });
  }
}

export default function* askBackendSaga() {
  yield takeEvery('ASK_BACKEND_SAGA', askBackend);
}
