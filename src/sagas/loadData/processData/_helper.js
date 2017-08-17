const resourceToURL = {
  EVENTS_GEO: 'geoEvents',
  PROPERTIES_ADMIN: 'admins',
  PROPERTIES_TYPE: 'types',
  BORDERS: 'geometries',
  BORDERS_TIMELINE: 'borders',
  TERRAIN: 'contours',
  LOCATIONS: 'cities',
  INVENTIONS: 'inventions'
};

export const getUrlFromResource = resource => (
  resourceToURL[resource]
    ? resourceToURL[resource]
    : resource.replace(/_/g, '/').toLowerCase()
);

export const defaultCb = (data, key = 'byId', dataCb = () => {}) => {
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
}

export const projectionSelector = state => state.runtime.projection;
