import { put, call } from 'redux-saga/effects';

import { inventionsTimelineFF } from '../../../reducers/actions';
import { defaultCb } from './_helper';

const fixInventors = (data) => {
  const byId = Object.keys(data.byId).reduce((prev, id) => ({
    ...prev,
    [id]: {
      ...data.byId[id],
      // Inventor field before looks like "{1,3}" => now it's an array
      inventor: data.byId[id].inventor.replace(/{|}/g, '').split(',')
    }
  }
  ), {});
  return { byId };
};

function* inventions(resp) {
  const data = yield call(fixInventors, defaultCb(resp, 'byId'));
  yield put({ type: 'INVENTIONS_FULFILLED', payload: data });

  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    return cur.inventDate in prev
      ? { ...prev, [cur.inventDate]: [...prev[cur.inventDate], cur.id] }
      : { ...prev, [cur.inventDate]: [cur.id] };
  }, {});
  yield put(inventionsTimelineFF(byYear));
}

export default inventions;
