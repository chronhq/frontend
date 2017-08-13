import { put } from 'redux-saga/effects';
import { factsTimelineFF } from '../../reducers/actions';

function* factsTimeline(action) {
  const data = action.payload;
  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    return cur.inventDate in prev
      ? { ...prev, [cur.inventDate]: [...prev[cur.inventDate], cur.id] }
      : { ...prev, [cur.inventDate]: [cur.id] };
  }, {});
  yield put(factsTimelineFF(byYear));
}

export default factsTimeline;
