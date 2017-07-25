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
    case 'SELECT_LOCATION': {
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

export default status;
