import { put } from 'redux-saga/effects';
import { factsTimelineFF } from '../../reducers/actions';

function* factsTimeline(action) {
  const data = action.payload;
  const byYear = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    return cur.invent_date in prev
      ? { ...prev, [cur.invent_date]: [...prev[cur.invent_date], cur.id] }
      : { ...prev, [cur.invent_date]: [cur.id] };
  }, {});
  yield put(factsTimelineFF(byYear));
}

export default factsTimeline;
