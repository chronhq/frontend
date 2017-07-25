const DEFAULT_YEAR = 1783;
const MAX_YEAR = 2017;

const initialState = {
  now: DEFAULT_YEAR,
  max: MAX_YEAR,
  min: DEFAULT_YEAR,
};

const year = (state = initialState, action) => {
  switch (action.type) {
    case 'PREV_YEAR':
      return { ...state, now: action.year };
    case 'NEXT_YEAR':
      return { ...state, now: action.year };
    case 'SET_YEAR':
      return { ...state, now: action.year };
    default:
      return state;
  }
};

export default year;
