import { readDataFile } from './helper';

function getPersons() {
  const filename = './data/persons.json';
  return { byId: readDataFile(filename) };
}

function personsData() {
  const data = getPersons();
  const deathFacts = Object.keys(data.byId).reduce((prev, curId) => {
    const cur = data.byId[curId];
    const birth = Number(cur.birthDate.replace(/-.*/g, ''));
    const death = Number(cur.deathDate.replace(/-.*/g, ''));
    const newFacts = prev;
    const bornFact = { type: 'born', id: cur.PersId };
    const deathFact = { type: 'death', id: cur.PersId };
    newFacts[birth] = birth in newFacts
      ? [...newFacts[birth], bornFact]
      : [bornFact];
    newFacts[death] = death in newFacts
      ? [...newFacts[death], deathFact]
      : [deathFact];
    return newFacts;
  }, {});
  const timelineYears = Object.keys(deathFacts).reduce((prevYear, curId) => {
    const alive = deathFacts[curId].reduce((prevAlive, curFact) => {
      return curFact.type === 'born'
        // some one is born, adding to array
        ? [...prevAlive, curFact.id]
        // remove dead body
        : prevAlive.filter(val => val !== curFact.id);
    }, prevYear.alive);
    return { alive,
      data: { ...prevYear.data, [curId]: alive } };
  }, { alive: [], data: {} });
  return {
    facts: deathFacts,
    byYear: timelineYears.data
  };
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
