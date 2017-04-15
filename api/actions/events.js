import { tables, getFromDB } from '../../shared';

export default function geoEvents(req, res, url) {
  const resJson = data => res.json(data);
  return url[0] === 'GEO'
    ? getFromDB(resJson, tables.GEO_EVENTS, 'byId')
    : res.status(404).end('NOT FOUND');
}
