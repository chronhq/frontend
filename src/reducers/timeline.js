import factsReducer from './facts';
import * as techData from '../data/tech';

const initialState = {
  intervalId: 0,
  interval: 500,
  now: 1750,
  max: 2000,
  min: 1750,
  facts: techData.getFactsData(),
  persons: techData.getPeople(),
  cities: techData.getCities()
};

const timeline = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INTERVAL':
      return { ...state, intervalId: action.id };
    case 'NEXT_YEAR':
      action.year = state.now + 1;
      // falls through
    case 'SET_YEAR':
      action.year = state.min < action.year && action.year < state.max ?
        action.year : state.min;
      return { ...state,
        facts: factsReducer(state.facts, action),
        now: action.year };
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
    year: initialState.now
  };
}

export function saveIntervalId(id) {
  return {
    type: 'SET_INTERVAL',
    id
  };
}
