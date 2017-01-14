import factsReducer from './factsTimeline';
import locationsReducer from './locationsTimeline';
import * as techData from '../data/tech';

const initialState = {
  intervalId: 0,
  interval: 500,
  now: 1750,
  max: 2000,
  min: 1750,
  facts: techData.getFactsTimeline(),
  locations: techData.getLoactionsTimeline(),
  borders: techData.getBordersTimeline(),
};

const timeline = (state = initialState, action) => {
  let act = action;
  switch (action.type) {
    case 'SET_INTERVAL':
      return { ...state, intervalId: action.id };
    case 'NEXT_YEAR':
      act = { ...action, year: state.now + 1 };
      // falls through
    case 'SET_YEAR':
      act = state.min < act.year && act.year < state.max ?
        act : { ...act, type: 'SET_YEAR', year: state.min };
      return { ...state,
        facts: factsReducer(state.facts, act),
        locations: locationsReducer(state.locations, act),
        borders: locationsReducer(state.borders, act),
        now: act.year };
    default:
      return state;
  }
};

export default timeline;

export function nextYear() {
  return { type: 'NEXT_YEAR' };
}

export function setYear(year) {
  return { type: 'SET_YEAR', year };
}

export function resetYear() {
  return {
    type: 'SET_YEAR',
    year: initialState.min
  };
}

export function saveIntervalId(id) {
  return {
    type: 'SET_INTERVAL',
    id
  };
}
