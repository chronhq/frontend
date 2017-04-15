import { tables, getFromDB } from '../../shared';

export default function persons(req, res) {
  const resJson = data => res.json(data);
  return getFromDB(resJson, tables.PERSONS, 'byId');
}
