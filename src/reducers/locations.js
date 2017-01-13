import * as techData from '../data/tech';

const initialState = techData.getLoactions();

const locations = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default locations;
