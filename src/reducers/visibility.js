const defaultState = {
  borders: 1,
  locations: 1,
  tooltips: 1,
  scale: 10
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

export function setVisibility(data) {
  return { type: 'CHANGE_VISIBILITY', data };
}
