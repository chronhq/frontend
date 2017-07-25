export function markItReady(ready = true) {
  return {
    type: 'CHANGE_STATUS',
    ready
  };
}

export function selectLocation(locationType = 'person', location = null) {
  return {
    type: 'SELECT_LOCATION_SAGA',
    location,
    locationType,
  };
}

export function setClickInfo(clickInfoType = 'border', clickInfo = null) {
  return {
    type: 'SELECT_CLICK_INFO',
    clickInfoType,
    clickInfo,
  };
}

export function startPlaying() {
  return {
    type: 'START_STOP',
    playing: true
  };
}

export function stopPlaying() {
  return {
    type: 'START_STOP',
    playing: false
  };
}
