import * as techData from '../data/tech';

const initialState = techData.getFactsData();

const facts = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default facts;
