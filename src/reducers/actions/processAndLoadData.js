export function setColorsData(colors) {
  return {
    type: 'LAND_OWNERSHIP_COLORS',
    colors
  };
}

export function inventionsTimelineFF(byYear) {
  return {
    type: 'INVENTIONS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  };
}

export function geoEventsFF(byYear) {
  return {
    type: 'EVENTS_GEO_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  };
}

export function personsTimelineFF(byYear) {
  return {
    type: 'PERSONS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  };
}

export function personsFactsTimelineFF(byYear) {
  return {
    type: 'PERSONS_FACTS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear)
    }
  };
}

export function personsFactsFF(byId) {
  return {
    type: 'PERSONS_FACTS_FULFILLED',
    payload: {
      byId
    }
  };
}

export function locationsTimelineFF(byYear) {
  return {
    type: 'LOCATIONS_TIMELINE_FULFILLED',
    payload: {
      byYear,
      allYears: Object.keys(byYear),
      current: []
    }
  };
}
