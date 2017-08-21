const resourceToURL = {
  EVENTS_GEO: 'geoEvents',
  PROPERTIES_ADMIN: 'admins',
  PROPERTIES_TYPE: 'types',
  BORDERS: 'geometries',
  BORDERS_TIMELINE: 'borders',
  TERRAIN: 'contours',
  LOCATIONS: 'cities',
};

export const getUrlFromResource = resource => (
  resourceToURL[resource]
    ? resourceToURL[resource]
    : resource.split('_').map(c => `${c.charAt(0).toUpperCase()}${c.slice(1).toLowerCase()}`).join('')
);

export const defaultCb = (data = [], key = 'byId') => {
  const keyData = data.reduce(
    (prev, row) => ({ ...prev, [row.id]: row }), {});
  // const cbRes = dataCb(data);
  // return { [key]: keyData, ...cbRes };
  return { [key]: keyData };
};

export const projectLocations = (data, project) => {
  const projected = data.reduce((prev, cur) => {
    const [x, y] = project([cur.x, cur.y]);
    return { ...prev, [cur.id]: { id: cur.id, x, y } };
  }, {});
  return projected;
};

export const projectionSelector = state => state.runtime.projection;
