export function getActualData(years, data, target) {
  if (typeof (years) === 'undefined') {
    return [];
  }
  const res = Math.max(...years.filter(y => y <= target));
  if (Number.isFinite(res)) {
    return data[res];
  }
  return [];
}

export function getNextData(years, data, target) {
  const res = Math.min(...years.filter(y => y > target));
  if (Number.isFinite(res)) {
    return data[res];
  }
  return [];
}
