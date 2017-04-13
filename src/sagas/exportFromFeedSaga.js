import { takeEvery, select } from 'redux-saga/effects';

export const stateSelector = state => ({
  persons: state.persons.byId,
  personsFacts: state.personsFacts.byId,
  locations: state.locations.places,
  facts: state.facts.byId
});

const getSelectedIds = selected =>
  Object.keys(selected).reduce(
    (prev, stateId) => (selected[stateId] === true
      ? [...prev, stateId]
      : prev), []);

const getLocationName = (id, loc) => (id in loc ? loc[id].name_rus : 'Неизвестно');
const getDate = date => (date ? date : '????');

function* exportFromFeed(action) {
  const state = yield select(stateSelector);
  const selected = action.selected;

  const newLine = window.navigator.platform === 'Win32' ? '\r\n' : '\n';

  const getFactDescription = (factId) => {
    const fact = state.facts[factId];
    const loc = getLocationName(fact.invent_place, state.locations);
    const ppl = fact.inventor.map(invId => state.persons[invId].name_rus);
    return [
      `Дата: ${fact.invent_date}, Место: "${loc}" Участники: "${ppl.join(', ')}"`,
      `Описание: "${fact.description}"`,
      `Дополнительная информация: "${fact.link}"`,
      ''
    ].join(newLine);
  };

  const getPersonFacts = (factId) => {
    const fact = state.personsFacts[factId];
    const person = state.persons[fact.person];
    const birthLoc = getLocationName(person.birth_place, state.locations);
    const deathLoc = getLocationName(person.death_place, state.locations);

    const birthDate = getDate(person.birth_date);
    const deathDate = getDate(person.death_date);
    return [
      `Имя: "${person.name_rus}"`,
      `Годы жизни: "${birthDate} - ${deathDate}"`,
      `Место рождения: "${birthLoc}"`,
      `Место смерти: "${deathLoc}"`,
      ''
    ].join(newLine);
  };

  const personsFacts = getSelectedIds(selected.persons).map(getPersonFacts);
  const inventions = getSelectedIds(selected.inventions).map(getFactDescription);
  // TODO format data according to action.format
  const data = [...personsFacts, ...inventions].join(newLine);
  const blob = new Blob([data], { type: 'text/plain' });
  const fileData = window.URL.createObjectURL(blob);

  const targetA = document.getElementById(action.id);
  targetA.href = fileData;
  targetA.click();


}

export default function* exportFromFeedSaga() {
  yield takeEvery('FEED_EXPORT', exportFromFeed);
}