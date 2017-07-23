import { put, takeEvery, select } from 'redux-saga/effects';

const stateSelector = state => ({
  current: state.timeline.borders.current,
  borders: state.data.borders.projected,
  properties: state.data.properties
});

const bordersDataSelector = state => state.runtime.bordersData;

function getBordersFromState({ current, borders, properties }) {

  if (current) {
    return Object.keys(current).reduce((prev, curId) => {
      const cur = current[curId];
      const curProps = properties.data.properties[cur.props];
      const filledProps = {
        ...curProps,
        type: properties.type.type[curProps.type],
        admin: properties.admin.admin[curProps.admin],
      };
      return {
        borders: [
          ...prev.borders, {
            id: [cur.geo],
            props: [cur.props],
            d: borders[cur.geo]
          }
        ],
        properties: [...prev.properties, filledProps]
      };
    }, {
      borders: [],
      properties: []
    });
  }
  return {
    borders: [],
    properties: []
  };
}

export function* prepareBordersProps() {
  const rawState = yield select(stateSelector);
  const bordersDataOld = yield select(bordersDataSelector);
  const bordersDataNew = getBordersFromState(rawState);
  if (bordersDataOld !== bordersDataNew) {
    yield put({ type: 'RUNTIME_BORDERS', bordersData: bordersDataNew });
  }
}

export default function* prepareBordersPropsSaga() {
  yield takeEvery('NEXT_YEAR', prepareBordersProps);
  yield takeEvery('PREV_YEAR', prepareBordersProps);
  yield takeEvery('SET_YEAR', prepareBordersProps);
  yield takeEvery('BORDERS_FULFILLED', prepareBordersProps);
  yield takeEvery('BORDERS_PROJECTED', prepareBordersProps);
}