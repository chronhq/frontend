import { readDataFile } from './helper';

function getFacts() {
  const filename = './data/inventions.json';

  return { allIds: readDataFile(filename) };
}
function factsTimeline() {
  const data = getFacts();
  const byYear = Object.keys(data.allIds).reduce((prev, curId) => {
    const cur = data.allIds[curId];
    return cur.date in prev
      ? { ...prev, [cur.date]: [...prev[cur.date], cur.id] }
      : { ...prev, [cur.date]: [cur.id] };
  }, {});
  return { byYear };
}

export default function facts(req, url) {
  return url[1] === 'TIMELINE'
    ? Promise.resolve(factsTimeline())
    : Promise.resolve(getFacts());
}
