export function nextYear() {
  return { type: 'CHANGE_YEAR_SAGA', action: 'NEXT_YEAR' };
}

export function prevYear() {
  return { type: 'CHANGE_YEAR_SAGA', action: 'PREV_YEAR' };
}

export function setYear(year) {
  return { type: 'CHANGE_YEAR_SAGA', action: 'SET_YEAR', year };
}

export function resetYear() {
  return { type: 'CHANGE_YEAR_SAGA', action: 'RESET_YEAR' };
}
