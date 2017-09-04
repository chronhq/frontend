const DEFAULT_YEAR = 1783;
const MAX_YEAR = 2017;
const DEFAULT_TICK = 1;

const initialState = {
  now: DEFAULT_YEAR,
  max: MAX_YEAR,
  min: DEFAULT_YEAR,
  tick: DEFAULT_TICK,
};

const year = (state = initialState, action) => {
  switch (action.type) {
    case 'PREV_YEAR':
      return { ...state, now: action.year };
    case 'NEXT_YEAR':
      return { ...state, now: action.year };
    case 'SET_YEAR':
      return { ...state, now: action.year };
    case 'CHANGE_INITIAL_YEAR':
      return { ...state, ...action.state };
    case 'CHANGE_TICK':
      return { ...state, tick: action.tick };
    default:
      return state;
  }
};

export default year;
