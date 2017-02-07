const terrain = (state = { loaded: false, topology: {} }, action) => {
  switch (action.type) {
    case 'TERRAIN_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'TERRAIN_FULFILLED':
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        topology: action.payload.terrain,
      };
    case 'TERRAIN_REJECTED':
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

export default terrain;
