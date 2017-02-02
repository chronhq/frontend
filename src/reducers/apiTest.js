import fetch from 'isomorphic-fetch';

const apiTest = (state = { loaded: false }, action) => {
  switch (action.type) {
    case 'API_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'API_FULFILLED':
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        result: action.payload
      };
    case 'API_REJECTED':
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
};

export function testApi() {
  return {
    type: 'API',
    payload: new Promise((resolve) => {
      fetch('/api/testApi').then((response) => {
        console.log('Response from fetch');
        console.log(response);
        resolve(response.json());
      });
    })
  };
}

export default apiTest;
