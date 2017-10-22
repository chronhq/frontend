export function getActualData(years, data, target, reducer) {
  if (typeof (years) === 'undefined') {
    // console.error('getActualData undefined year', reducer, years, data, target);
    return [];
  }
  const res = Math.max(...years.filter(y => y <= target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}

export function getNextData(years, data, target) {
  const res = Math.min(...years.filter(y => y > target));
  if (isFinite(res)) {
    return data[res];
  }
  return [];
}
