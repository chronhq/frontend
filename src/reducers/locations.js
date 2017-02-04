const locations = (state = { loaded: false, places: {}, allIds: [] }, action) => {
  switch (action.type) {
    case 'LOCATIONS_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'LOCATIONS_FULFILLED':
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        places: action.payload.places,
        allIds: action.payload.allIds,
      };
    case 'LOCATIONS_REJECTED':
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

export default locations;
