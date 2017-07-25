import { put } from 'redux-saga/effects';
import { setColorsData } from '../../reducers/actions';

function* colorsData(action) {
  const data = action.payload.properties;
  // Count the colors per 'admin'
  const ranking = Object.keys(data).reduce((prev, curId) => {
    const cur = data[curId];
    if(cur.disputed !== '') return prev;
    const admin = prev[cur.admin] || {};
    admin[cur.mapcolor13] = (admin[cur.mapcolor13] || 0) + 1;
    return { ...prev, [cur.admin]: admin };
  }, {});
  // Find the most common color for this 'admin'
  const colors = Object.keys(ranking).reduce((prev, admin) => {
    const adminMax = Object.keys(ranking[admin]).reduce((color, curColor) =>
      (ranking[admin][curColor] > color.value
      ? { value: ranking[admin][curColor], id: curColor }
      : color), { value: 0, id: 1 })
    return { ...prev, [admin]: adminMax.id };
    }, {});

  yield put(setColorsData(colors));
}

export default colorsData;