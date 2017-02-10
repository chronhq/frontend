const generic = (state = { loaded: false, type: 'GENERIC' }, action) => {
  switch (action.type) {
    case `${state.type}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${state.type}_FULFILLED`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        ...action.payload
      };
    case `${state.type}_REJECTED`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default generic;
