export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  let status = '';
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    status = true;
  } catch (err) {
    // Ignore errors
    console.log('localStorage error', err);
    status = false;
  }
  return status;
};

export const getCookie = () => {
  try {
    const data = document.cookie;
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const setCookie = (name, value, expire) => {
  console.log('setCookie', name, value, expire);
  document.cookie = `${name}=${value};${expire};path=/`;
};
