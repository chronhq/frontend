import { tables, getFromDB } from '../shared';

export default function facts(req, res) {
  const resJson = data => res.json(data);
  return getFromDB(resJson, tables.PERSONS, 'byId');
}
