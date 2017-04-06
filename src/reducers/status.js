const defaultState = {
  ready: false,
  selectedLocation: null
};

const status = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_STATUS': {
      return { ...state, ready: action.ready };
    }
    case 'SELECT_LOCATION_SAGA': {
      return { ...state, selectedLocation: action.location };
    }

    default: {
      return state;
    }
  }
};

export function markItReady(ready = true) {
  return {
    type: 'CHANGE_STATUS',
    ready
  };
}

export function selectLocation(location = null) {
  return {
    type: 'SELECT_LOCATION',
    location
  };
}

export default status;
