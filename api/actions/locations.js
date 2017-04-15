import { getProjection, tables, getFromDB } from '../../shared';

function projectLocations(data) {
  // using default projection
  const project = getProjection();
  const projected = data.reduce((prev, cur) => {
    const [x, y] = project([cur.x, cur.y]);
    return { ...prev, [cur.id]: { id: cur.id, x, y } };
  }, {});
  return { projected };
}

export default function locations(req, res) {
  const resJson = data => res.json(data);
  getFromDB(resJson, tables.CITIES, 'places', '', projectLocations);
}
