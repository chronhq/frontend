import * as techData from '../data/tech';

const initialState = techData.getPeople();

const persons = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default persons;
