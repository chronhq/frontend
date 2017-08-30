import { put } from 'redux-saga/effects';
import { setColorsData } from '../../../reducers/actions';
import { defaultCb } from './_helper';


function* properties(res, resource, req) {
  const payload = defaultCb(res, req.key);
  yield put({ type: 'PROPERTIES_FULFILLED', payload });

  const data = payload.properties;
  // Count the colors per 'admin'
  const ranking = Object.keys(data).reduce((prev, curId) => {
    const cur = data[curId];
    if (cur.disputed !== '') return prev;
    const admin = prev[cur.admin] || {};
    admin[cur.color] = (admin[cur.color] || 0) + 1;
    return { ...prev, [cur.admin]: admin };
  }, {});
  // Find the most common color for this 'admin'
  const colors = Object.keys(ranking).reduce((prev, admin) => {
    const adminMax = Object.keys(ranking[admin]).reduce((color, curColor) =>
      (ranking[admin][curColor] > color.value
        ? { value: ranking[admin][curColor], id: curColor }
        : color), { value: 0, id: 1 });
    return { ...prev, [admin]: adminMax.id };
  }, {});

  yield put(setColorsData(colors));
}

export default properties;
