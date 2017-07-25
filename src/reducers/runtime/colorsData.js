const defaultState = { colors: {}, auto: true, enabled: true, zoomPoint: 4, name: 'grouped' };

const getName = enabled => (enabled === true ? 'grouped' : 'separated');

const colorsData = (state = defaultState, action) => {
  switch (action.type) {
    case 'LAND_OWNERSHIP_COLORS': {
      return { ...state, colors: action.colors };
    }
    case 'LAND_OWNERSHIP_COLORS_CHANGE': {
      return {
        ...state,
        auto: action.auto,
        zoomPoint: action.zoomPoint,
        name: getName(action.enabled),
        enabled: action.enabled
      };
    }
    case 'LAND_OWNERSHIP_COLORS_AUTO': {
      return { ...state, enabled: action.enabled, name: getName(action.enabled) };
    }
    default: {
      return state;
    }
  }
};

export default colorsData;
