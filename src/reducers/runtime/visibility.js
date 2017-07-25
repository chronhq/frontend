const defaultState = {
  borders: 1,
  locations: 1,
  tooltips: 1,
  scale: 5
};

const visibility = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_VISIBILITY':
      return { ...state, ...action.data };
    default:
      return state;
  }
};
export default visibility;
