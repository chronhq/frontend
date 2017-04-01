const generic = (state = { loaded: false, REDUCER_NAME: 'GENERIC' }, action) => {
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
        ...action.payload
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
      }
    default:
      return state;
  }
};

export default generic;
