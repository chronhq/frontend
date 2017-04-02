const bordersDefaultState = {
  loaded: false,
  loading: false,
  REDUCER_NAME: 'BORDERS',
  byYear: {},
  projected: {}
};

const generic = (state = bordersDefaultState, action) => {
  switch (action.type) {
    case `${state.REDUCER_NAME}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${state.REDUCER_NAME}_FULFILLED`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        byYear: { ...state.byYear, ...action.payload.byYear },
        projected: { ...state.projected, ...action.payload.projected }
      };
    case `${state.REDUCER_NAME}_REJECTED`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case `${state.REDUCER_NAME}_PROJECTED`:
      return {
        ...state,
        projected: action.projected
      };
    default:
      return state;
  }
};

export default generic;
