import { tables, getFromDB } from '../shared';

export default function properties(req, res, url) {
  url.shift();
  const resJson = data => res.json(data);
  switch (url[0]) {
    case 'ADMIN':
      return getFromDB(resJson, tables.ADMIN, 'admin');
    case 'TYPE':
      return getFromDB(resJson, tables.TYPE, 'type');
    default:
      return getFromDB(resJson, tables.PROPERTIES, 'properties');
  }
}
