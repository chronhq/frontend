const defaultState = {
  bordersData: {
    borders: [],
    properties: []
  }
};
const runtime = (state = defaultState, action) => {
  switch(action.type) {
    case 'RUNTIME_BORDERS': {
      return { ...state, bordersData: action.bordersData };
    }
    default: {
      return state;
    }
  }
}

export default runtime;