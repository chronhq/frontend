const defaultState = {
  ready: false,
  yearInterval: 1000,
  playing: false,
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
    case 'START_STOP': {
      return { ...state, playing: action.playing };
    }
    case 'SET_YEAR_INTERVAL': {
      return { ...state, yearInterval: action.yearInterval };
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

export function startPlaying() {
  return {
    type: 'START_STOP',
    playing: true
  };
}

export function stopPlaying() {
  return {
    type: 'START_STOP',
    playing: false
  };
}

export default status;
