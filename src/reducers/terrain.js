import initialState from '../data/svg';

const region = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_REGION':
    default:
      return state;
  }
};
const terrain = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_REGION':
      return state.map(r =>
        region(r, action)
      );
    default:
      return state;
  }
};
export default terrain;
