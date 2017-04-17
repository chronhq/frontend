import db, { tables, getFromDB } from '../../shared/database';
import { logger } from '../../shared';

const conditions = [
  `${tables.SURVEYS}.start_date <= CURRENT_DATE`,
  `${tables.SURVEYS}.end_date > CURRENT_DATE`,
  `${tables.SURVEYS}.active`
].join(' and ');
const where = `where ${conditions}`;

function validateSurveyData(body) {
  return [Number(body.surveyId), JSON.stringify(body.surveyData)];
}
function insertAnswer(req, res) {
  logger.info('Inserting answer', req.body);
  const [surveyId, data] = validateSurveyData(req.body);
  db.none(`INSERT INTO ${tables.ANSWERS} (survey, answer) VALUES($1, $2)`, [surveyId, data])
    .then(() => res.json({ [surveyId]: { result: true } }))
    .catch(error => res.json({ [surveyId]: { result: false, error } }));
}

export default function surveys(req, res, url) {
  const resJson = data => res.json(data);

  return url[0] === 'ANSWER'
    ? insertAnswer(req, res)
    : getFromDB(resJson, tables.SURVEYS, 'byId', where);
}
