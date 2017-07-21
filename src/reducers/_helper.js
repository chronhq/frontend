export const getReducerState = (name, fields) => ({
  loaded: false,
  REDUCER_NAME: name,
  ...fields
});

export const newDummyReducer = (reducerFn) =>
  (name, fields) =>
    (state = getReducerState(name, fields), action) =>
      reducerFn(state, action);