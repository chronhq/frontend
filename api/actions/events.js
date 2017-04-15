import { tables, getFromDB } from '../../shared';
import { projectLocations } from './locations';

export default function events(req, res, url) {
  const resJson = data => res.json(data);
  return url[0] === 'GEO'
    ? getFromDB(resJson, tables.GEO_EVENTS, 'byId', "where description<>''", projectLocations)
    : res.status(404).end('NOT FOUND');
}
