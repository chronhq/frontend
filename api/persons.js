import { readDataFile } from './helper';

function getPersons() {
  const filename = './data/persons.json';
  return { allIds: readDataFile(filename) };
}

function personsData() {
  const data = getPersons();
  const compiledData = Object.keys(data.allIds).reduce((prev, curId) => {
    const cur = data.allIds[curId];
    const birth = Number(cur.birthDate.replace(/-.*/g, ''));
    const death = Number(cur.deathDate.replace(/-.*/g, ''));
    const result = prev.byYear || {};
    let year = birth;
    while (year <= death) { // Building map of alive persons
      result[year] = year in result
        ? [...result[year], cur.PersId]
        : [cur.PersId];
      year += 1;
    }
    const newFacts = prev.facts || {};
    const bornFact = { type: 'born', id: cur.PersId };
    const deathFact = { type: 'death', id: cur.PersId };
    newFacts[birth] = birth in newFacts
      ? [...newFacts[birth], bornFact]
      : [bornFact];
    newFacts[death] = death in newFacts
      ? [...newFacts[death], deathFact]
      : [deathFact];
    return {
      byYear: result,
      facts: newFacts
    };
  }, {});
  return compiledData;
}
function getPersonsFacts() {
  const data = personsData();
  return { facts: data.facts };
}
function getPersonsTimeline() {
  const data = personsData();
  return { byYear: data.byYear };
}

export default function facts(req, url) {
  switch (url[1]) {
    case 'TIMELINE':
      return Promise.resolve(getPersonsTimeline());
    case 'FACTS':
      return Promise.resolve(getPersonsFacts());
    default:
      return Promise.resolve(getPersons());
  }
}
