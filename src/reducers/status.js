const defaultState = {
  ready: false
};

const status = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_STATUS': {
      return { ...state, ready: action.ready };
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

export default status;
