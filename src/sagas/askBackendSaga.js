import fetch from 'isomorphic-fetch';
import { put, takeEvery, select, call } from 'redux-saga/effects';

export default function* askBackendSaga() {
  yield takeEvery('ASK_BACKEND_SAGA', askBackend);
}

function fetchResponse(url, req){
  return fetch(url, req).then((response) => response.json());
}

function* askBackend({resource, data, type}) {
  const uri = resource.replace(/_/g, '/');
  const url = `/api/${uri}`;
  const req = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };

  yield put({type: `${resource}_PENDING`});
  try {
    const payload = yield call(fetchResponse, url, req);
    // console.log(payload);
    yield put({type: `${resource}_FULFILLED`, payload});
  } catch (e) {
    yield put({type: `${resource}_REJECTED`, payload: { error: e.message }});
  }
}