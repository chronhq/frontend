import { put } from 'redux-saga/effects';
import { locationsTimelineFF } from '../../reducers/actions';


function* locationsTimeline(action) {
  const places = action.payload.places;
  const timeline = Object.keys(places).reduce((prev, cur) => {
    const place = places[cur];
    if ('founded' in place && place.founded !== '' && place.founded !== null) {
      const year = Number(place.founded.split('-').shift());
      if (!(year in prev)) {
        return { ...prev, [year]: [place.id] };
      }
      return { ...prev, [year]: [...prev[year], place.id] };
    }
    return { ...prev };
  }, {});

  let previousYear;
  for (const currentYear of Object.keys(timeline)) {
    if (!(typeof previousYear === 'undefined')) {
      timeline[currentYear] = [...timeline[previousYear], ...timeline[currentYear]];
    }
    previousYear = currentYear;
  }

  yield put(locationsTimelineFF(timeline));
}

export default locationsTimeline;
