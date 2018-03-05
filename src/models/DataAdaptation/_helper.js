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

export function getBirthAndDeath(cur) {
  let birth = null;
  let death = null;
  if (cur.birthDate !== null) {
    try {
      birth = Number(cur.birthDate.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  if (cur.deathDate !== null) {
    try {
      death = Number(cur.deathDate.replace(/-.*/g, ''));
    } catch (e) {
      console.log('Failed to generate timeline data for', cur.id, e);
    }
  }
  return [birth, death];
}
