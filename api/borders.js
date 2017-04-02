import { logger, validateIds, getPath } from './helper';
import db, { tables } from '../shared/database';

function getTimeline(res) {
  db.any(`select * from ${tables.BORDERS}`).then((data) => {
    const timeline = data.reduce((prev, row) => {
      const d = { [row.id]: { geo: row.geo, props: row.props } };
      if (row.year in prev) {
        return { ...prev,
          [row.year]: { ...prev[row.year], ...d }
        };
      }
      return { ...prev, [row.year]: d };
    }, {});
    res.json({
      byYear: timeline,
      allYears: Object.keys(timeline)
    });
  })
  .catch((error) => {
    logger.err(error);
    res.json({
      byYear: {},
      allYears: []
    });
  });
}

function getBorders(req, res) {
  const projection = req.body.projection;
  const pathFn = getPath(projection);
  const ids = validateIds(req.body.ids);
  const where = ids ? `where id IN (${ids})` : 'limit 1';

  db.any(`select * from ${tables.GEOMETRY} ${where}`).then((data) => {
    const geometry = data.reduce(
      (prev, row) => ({
        byYear: { ...prev.byYear, [row.id]: row.geometry },
        projected: { ...prev.projected, [row.id]: pathFn(row.geometry) }
      }), { byYear: {}, projected: {} });
    res.json(geometry);
  })
  .catch((error) => {
    logger.err(error);
    res.json({ byYear: {}, projected: {} });
  });
}

export default function borders(req, res, url) {
  url.shift();
  logger.json(req.body);
  return url[0] === 'TIMELINE'
    ? getTimeline(res)
    : getBorders(req, res);
}
