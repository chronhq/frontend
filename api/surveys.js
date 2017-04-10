import db, { tables, getFromDB } from '../shared';

const conditions = [
  `${tables.SURVEYS}.start_date <= CURRENT_DATE`,
  `${tables.SURVEYS}.end_date > CURRENT_DATE`,
  `${tables.SURVEYS}.active`
].join(' and ');
const where = `where ${conditions}`;

function insertAnswer(req, res) {
  const surveyId = req.body.surveyId;
  const data = req.body.surveyData;

  db.none(`INSERT INTO ${tables.SURVEYS} (survey, json) VALUES($1, $2)`, [surveyId, data])
    .then(() => res.json({ result: true }))
    .catch(error => res.json({ result: false, error }));
}

export default function surveys(req, res, url) {
  url.shift();
  const resJson = data => res.json(data);

  switch (url[0]) {
    case 'ANSWER':
      return insertAnswer(req, res);
    default:
      return getFromDB(resJson, tables.SURVEYS, 'byId', where);
  }
}
