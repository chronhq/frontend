const defaultState = {
  ready: false,
  yearInterval: 1000,
  playing: false,
  clickInfo: null,
  clickInfoType: 'location', // 'border', 'location'
  selectedLocation: null,
  selectedLocationType: 'persons' // inventions, geoEvents, persons
};

const status = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_STATUS': {
      return { ...state, ready: action.ready };
    }
    case 'SELECT_LOCATION_SAGA': {
      return { ...state,
        selectedLocation: action.location,
        selectedLocationType: action.locationType
      };
    }
    case 'SELECT_CLICK_INFO': {
      return { ...state,
        clickInfo: action.clickInfo,
        clickInfoType: action.clickInfoType
      };
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

export function selectLocation(locationType = 'person', location = null) {
  return {
    type: 'SELECT_LOCATION',
    location,
    locationType,
  };
}

export function setClickInfo(clickInfoType = 'border', clickInfo = null) {
  return {
    type: 'SELECT_CLICK_INFO',
    clickInfoType,
    clickInfo,
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
