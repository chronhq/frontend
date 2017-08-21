const defaultState = {
  borders: [],
  properties: []
};
const runtime = (state = defaultState, action) => {
  switch (action.type) {
    case 'RUNTIME_BORDERS': {
      return { ...state, ...action.bordersData };
    }
    default: {
      return state;
    }
  }
};

export default runtime;
