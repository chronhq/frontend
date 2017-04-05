import { tables, getFromDB, getPath } from '../shared';

function projectTerrain(data) {
  const pathFn = getPath();
  const projected = data.reduce((prev, cur) => ({ ...prev, [cur.id]: pathFn(cur.contour) }), {});
  return { projected };
}
export default function terrain(req, res) {
  const resJson = data => res.json(data);
  getFromDB(resJson, tables.CONTOUR, 'byId', '', projectTerrain);
}
