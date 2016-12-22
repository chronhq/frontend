const fact = (state, action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
    case 'SET_YEAR':
      return state.year > action.year ? {...state, completed:false} : {...state, completed:true};
    case 'TOGGLE_FACT':
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state
  }
};

const facts = (state = [], action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
    case 'SET_YEAR':
    case 'TOGGLE_FACT':
      return state.map(f =>
        fact(f, action)
      );
    default:
      return state
  }
};

export default facts
