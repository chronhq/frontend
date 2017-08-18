const defaultState = {
  alignPanel: 'right',
  themeColor: 'light'
};

const facade = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_UI':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export default facade;
