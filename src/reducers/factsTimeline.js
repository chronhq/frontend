const factsTimeline = (state = {}, action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
      return { ...state,
        current: action.year in state.byYear ?
          [...state.current, state.byYear[action.year]] :
          state.current // Zero facts happened in this year
      };
    case 'SET_YEAR':
      return { ...state,
        current: action.year in state.byYear ? [state.byYear[action.year]] : []
      };
    default:
      return state;
  }
};

export default factsTimeline;
