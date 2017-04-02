import { getFromDB } from './helper';
import { tables } from '../shared/database';


function getAdmin(res) {
  getFromDB(res, tables.ADMIN, 'admin');
}

function getType(res) {
  getFromDB(res, tables.TYPE, 'type');
}

function getProps(req, res) {
  // const ids = validateIds(req.body.ids);
  // const where = ids ? `where id IN (${ids})` : 'limit 1';
  getFromDB(res, tables.PROPERTIES, 'properties');
}

export default function properties(req, res, url) {
  url.shift();
  switch (url[0]) {
    case 'ADMIN':
      return getAdmin(res);
    case 'TYPE':
      return getType(res);
    default:
      return getProps(req, res);
  }
}
