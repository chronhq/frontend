import { getProjection, getPath } from '../../shared/projections';


const resourceToURL = {
  EVENTS_GEO: 'geoEvents',
  PROPERTIES_ADMIN: 'admins',
  PROPERTIES_TYPE: 'types',
  BORDERS: 'geometries',
  BORDERS_TIMELINE: 'borders',
  TERRAIN: 'contours',
  LOCATIONS: 'cities',
  FACTS: 'inventions'
};

export const getUrlFromResource = resource => (
  resourceToURL[resource]
    ? resourceToURL[resource]
    : resource.replace(/_/g, '/').toLowerCase()
);

const defaultCb = (data, key = 'byId', dataCb = () => {}) => {
  const keyData = data.reduce(
    (prev, row) => ({ ...prev, [row.id]: row }), {});
  const cbRes = dataCb(data);
  return { [key]: keyData, ...cbRes };
};

const projectTerrain = (data) => {
  console.log('Project ter', data);
  const pathFn = getPath();
  const projected = data.reduce((prev, cur) => ({ ...prev, [cur.id]: pathFn(cur.contour) }), {});
  return { projected };
};

const projectLocations = (data) => {
  // using default projection
  const project = getProjection();
  const projected = data.reduce((prev, cur) => {
    const [x, y] = project([cur.x, cur.y]);
    return { ...prev, [cur.id]: { id: cur.id, x, y } };
  }, {});
  return { projected };
};

const fixInventors = (data) => {
  const byId = Object.keys(data.byId).reduce((prev, id) => ({
    ...prev,
    [id]: {
      ...data.byId[id],
      // Inventor field before looks like "{1,3}" => now it's an array
      inventor: data.byId[id].inventor.replace(/{|}/g, '').split(',')
    }
  }
  ), {});
  return { byId };
};


// export const validateIds = (ids) => {
//   if (typeof ids !== 'undefined' && Array.isArray(ids)) {
//     return ids.reduce((prev, id) => {
//       const checked = Number(id);
//       return isNaN(checked) ? prev : [...prev, checked];
//     }, []);
//   }
//   return null;
// };

const getBordersTimeline = (data) => {
  const timeline = data.reduce((prev, row) => {
    const d = { [row.id]: { geo: row.geo, props: row.props } };
    if (row.year in prev) {
      return { ...prev,
        [row.year]: { ...prev[row.year], ...d }
      };
    }
    return { ...prev, [row.year]: d };
  }, {});
  return {
    byYear: timeline,
    allYears: Object.keys(timeline)
  };
};

  // const ids = validateIds(req.body.ids);
  // const where = ids ? `where id IN (${ids})` : 'limit 1';

  // db.any(`select * from ${tables.GEOMETRY} ${where}`).then(
const getBorders = (data) => {
    // const projection = req.body.projection;
    // const pathFn = getPath(projection);
  const pathFn = getPath();
  const geometry = data.reduce(
    (prev, row) => ({
      byId: { ...prev.byId, [row.id]: row.geometry },
      projected: { ...prev.projected, [row.id]: pathFn(row.geometry) }
    }), { byId: {}, projected: {} });
  return geometry;
};

const resourceToCb = {
  PERSONS: defaultCb,
  TERRAIN: data => defaultCb(data, 'byId', projectTerrain),
  PROPERTIES: data => defaultCb(data, 'properties'),
  PROPERTIES_ADMIN: data => defaultCb(data, 'admin'),
  PROPERTIES_TYPE: data => defaultCb(data, 'type'),
  LOCATIONS: data => defaultCb(data, 'places', projectLocations),
  FACTS: data => fixInventors(defaultCb(data, 'byId')),
  EVENTS_GEO: data => defaultCb(data, 'byId', projectLocations),
  BORDERS: getBorders,
  BORDERS_TIMELINE: getBordersTimeline
};

export const getCbFromResource = resource => (
  resourceToCb[resource]
    ? resourceToCb[resource]
    : d => d
);
