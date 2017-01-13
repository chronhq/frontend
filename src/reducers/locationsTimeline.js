function getActualData(years, data, target) {
  const res = Math.max(...years.filter(y => y < target));
  console.log(target);
  console.log(res);
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}

const locationsTimeline = (state = {}, action) => {
  switch (action.type) {
    case 'NEXT_YEAR':
      return { ...state,
        current: action.year in state.byYear ?
          state.byYear[action.year] :
          state.current // Zero facts happened in this year
      };
    case 'SET_YEAR':
      return { ...state,
        current: action.year in state.byYear ? [state.byYear[action.year]] :
        getActualData(state.allYears, state.byYear, action.year)
      };
    default:
      return state;
  }
};

export default locationsTimeline;
