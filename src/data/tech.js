const glasgow = { id: 'loc1', name: 'Glasgow', cx: '150', cy: '150' };
const london = { id: 'loc2', name: 'London', cx: '100', cy: '100' };
const moscow = { id: 'loc3', name: 'Moscow', cx: '300', cy: '300' };
const paris = { id: 'loc4', name: 'Paris', cx: '50', cy: '300' };
const usa = { id: 'loc5', name: 'USA', cx: '400', cy: '500' };
const canada = { id: 'loc6', name: 'Canada', cx: '500', cy: '500' };
const stockholm = { id: 'loc7', name: 'Stockholm', cx: '500', cy: '100' };
const berlin = { id: 'loc8', name: 'Berlin', cx: '500', cy: '300' };

function extractIds(arr) {
  const obj = {};
  for (const item of arr) {
    obj[item.id] = item;
  }
  return obj;
}

export function getLocations() {
  return extractIds([glasgow, london, moscow, paris, usa, canada, stockholm, berlin]);
}

let pepId = 0;
function giveBirth(givenName, birth = '0000', death = '0000') {
  pepId += 1;
  return { id: pepId, name: givenName, birth, death };
}
const hansson = giveBirth('Söfring Hansson');
const watt = giveBirth('James Watt');
const maudslay = giveBirth('Henry Maudslay');
const lodygin = giveBirth('Alexander Lodygin');
const gottfried = giveBirth('Johann Gottfried Galle');
const edison = giveBirth('Thomas Edison');
const woodward = giveBirth('Henry Woodward');
const evans = giveBirth('Mathew Evans');
const mendeleev = giveBirth('Dmitry Mendeleev');
const diesel = giveBirth('Rudolph Diesel');

export function getPeople() {
  return extractIds([hansson, watt, maudslay, lodygin, gottfried,
    edison, woodward, evans, mendeleev, diesel]);
}

const facts = extractIds([
  {
    id: 't1',
    name: 'Maiden voyage of Vasa',
    authors: [hansson.id],
    description: 'Vasa sank in full view of a crowd of hundreds, if not \
    thousands, of mostly ordinary Stockholmers who had come to see the great \
    ship set sail. The crowd included foreign ambassadors, in effect spies of \
    Gustavus Adolphus\' allies and enemies, who also witnessed the catastrophe.',
    year: '1628',
    location: [stockholm.id]
  },
  {
    id: 't2',
    name: 'Steam engine',
    authors: [watt.id],
    description: 'Watt\'s ten-horsepower engines enabled a wide range of \
    manufacturing machinery to be powered. The engines could be sited anywhere \
    that water and coal or wood fuel could be obtained',
    year: '1781',
    location: [glasgow.id]
  },
  {
    id: 't3',
    name: 'Screw-cutting lathe',
    authors: [maudslay.id],
    description: 'Standardized screw thread sizes for the first time which in \
    turn allowed the application of interchangeable parts \
    (a prerequisite for mass production), were an important \
    foundation for the Industrial Revolution.',
    year: '1800',
    location: [london.id]
  },
  {
    id: 't4',
    name: 'Neptune discovered',
    authors: [gottfried.id],
    description: 'The first two thirds of Neptune is composed of a mixture of \
    molten rock, water, liquid ammonia and methane. The outer third is a \
    mixture of heated gases comprised of hydrogen, helium, water and methane. \
    Methane gives Neptune its blue cloud color.',
    year: '1846',
    month: '09',
    day: '23',
    location: [berlin.id]
  },
  {
    id: 't5',
    name: 'Incandescent light bulb',
    authors: [lodygin.id],
    description: 'He used as a burner two carbon rods of diminished section \
    in a glass receiver, hermetically sealed, and filled with nitrogen, \
    electrically arranged so that the current could be passed \
    to the second carbon when the first had been consumed',
    year: '1872',
    location: [moscow.id]
  },
  {
    id: 't6',
    name: 'Light bulb',
    authors: [edison.id, woodward.id, evans.id],
    description: 'lamp consisting of carbon rods mounted in \
    a nitrogen-filled glass cylinder',
    year: '1874',
    month: '07',
    day: '24',
    location: [usa.id, canada.id]
  },
  {
    id: 't7',
    name: 'Smokeless Powder',
    authors: [mendeleev.id],
    description: 'When ignited, it will burn/explode quickly, and with \
    excessive heat output. If ignited in a tight, contained space, it will \
    leave little to no remnants, such as unburned powder, particular kinds \
    of flame scarring, or smoke of any kind.',
    year: '1891',
    month: '01',
    day: '23',
    location: [moscow.id]
  },
  {
    id: 't8',
    name: 'Diesel engine',
    authors: [diesel.id],
    description: 'The definition of a "Diesel" engine to many has become an \
    engine that uses compression ignition. To some it may be an engine that \
    uses heavy fuel oil. To others an engine that does not use spark ignition.',
    year: '1892',
    month: '02',
    day: '23',
    location: [paris.id]
  }
]);


function getFactsByYear() {
  const factsByYear = {};
  for (const id in facts) {
    const year = facts[id].year;
    if (!(year in factsByYear)) {
      factsByYear[year] = [];
    }
    factsByYear[year].push(id);
  }
  return factsByYear;
}

function getFactsIds() {
  const factsIds = [];
  for (const id in facts) {
    factsIds.push(id);
  }
  return factsIds;
}

export function getFactsTimeline() {
  return {
    byYear: getFactsByYear(),
    current: []
  };
}

export function getFactsData() {
  return {
    byId: facts,
    allIds: getFactsIds()
  };
}

export function getLoactionsTimeline() {
  return {
    byYear: { 1600: ['loc1', 'loc2'],
      1650: ['loc1', 'loc2', 'loc3'],
      1670: ['loc1', 'loc2', 'loc3', 'loc7', 'loc8'],
      1740: ['loc1', 'loc2', 'loc3', 'loc4', 'loc6'],
      1760: ['loc1', 'loc2', 'loc3', 'loc4', 'loc6'],
      1780: ['loc1', 'loc2', 'loc3', 'loc4', 'loc5', 'loc6', 'loc7', 'loc8'],
      1850: ['loc6', 'loc5', 'loc4', 'loc7', 'loc8'],
    },
    allYears: [1600, 1650, 1670, 1740, 1760, 1780, 1850],
    current: []
  };
}

const borders = extractIds([
  { id: '1-1', d: 'm 295.58263,414.6483 c -56.61865,83.26272 31.63983,105.74365 31.63983,105.74365 l -74.10382,64.94491 c 0,0 -224.548691,17.0889 -163.194911,-84.92796 C 151.27751,398.39204 242.99219,397.60744 242.99219,397.60744 c 0,0 50.1643,0.0167 48.49494,-55.57303 -1.66936,-55.58971 56.44109,-36.89287 56.44109,-36.89287 0,0 82.54,47.05973 85.87051,86.19321 3.33051,39.13347 -138.2161,23.31355 -138.2161,23.31355 z' },
  { id: '1-2', d: 'm 295.58263,414.6483 209.74963,55.62641 6.32687,-119.69317 -97.07333,6.57728 c 0,0 25.25732,31.3941 19.21293,41.66957 -16.65254,28.30932 -138.2161,15.81991 -138.2161,15.81991 z' },
  { id: '1-3', d: 'm 253.11864,585.33686 74.10382,-64.94491 178.07641,-50.11724 6.36026,-119.69317 46.59187,-18.98063 1.65266,205.38147 -176.05079,45.10613 z' },
  { id: '1-4', d: 'M 327.22246,520.39195 505.29887,470.27471 295.58263,414.6483 c 0,0 -56.61864,74.10382 31.63983,105.74365 z' },
  { id: '2-1', d: 'm 295.58263,414.6483 c -56.61865,83.26272 31.63983,105.74365 31.63983,105.74365 l -74.54797,80.20977 c 0,0 -250.7486088,-30.64842 -189.394829,-132.66528 61.353779,-102.01686 179.712529,-70.329 179.712529,-70.329 0,0 50.1643,0.0167 48.49494,-55.57303 -1.66936,-55.58971 56.44109,-36.89287 56.44109,-36.89287 0,0 82.54,47.05973 85.87051,86.19321 3.33051,39.13347 -138.2161,23.31355 -138.2161,23.31355 z' },
  { id: '2-2', d: 'm 295.58263,414.6483 173.11404,45.63488 42.96246,-109.70164 -97.07333,6.57728 c 0,0 25.25732,31.3941 19.21293,41.66957 -16.65254,28.30932 -138.2161,15.81991 -138.2161,15.81991 z' },
  { id: '2-3', d: 'm 264.77542,587.00211 62.44704,-66.61016 141.47421,-60.10877 42.96246,-109.70164 46.59187,-18.98063 1.65266,205.38147 -176.05079,45.10613 z' },
  { id: '2-4', d: 'M 327.22246,520.39195 468.69667,460.28318 295.58263,414.6483 c 0,0 -56.61864,74.10382 31.63983,105.74365 z' },
  { id: '3-1', d: 'm 295.58263,414.6483 c -56.61865,83.26272 31.63983,105.74365 31.63983,105.74365 l -74.54797,80.20977 c 0,0 -250.7486088,-30.64842 -189.394829,-132.66528 61.353779,-102.01686 179.712529,-70.329 179.712529,-70.329 0,0 50.1643,0.0167 48.49494,-55.57303 -1.66936,-55.58971 56.44109,-36.89287 56.44109,-36.89287 0,0 82.54,47.05973 85.87051,86.19321 3.33051,39.13347 -138.2161,23.31355 -138.2161,23.31355 z' },
  { id: '3-2', d: 'm 295.58263,414.6483 173.11404,45.63488 60.25704,-145.24233 -114.36791,42.11797 c 0,0 25.25732,31.3941 19.21293,41.66957 -16.65254,28.30932 -138.2161,15.81991 -138.2161,15.81991 z' },
  { id: '3-3', d: 'm 252.67449,600.60172 99.52678,-59.39409 116.4954,-80.92445 60.25704,-145.24233 82.36627,-2.52074 -51.41632,224.46227 -176.05079,45.10613 z' },
  { id: '3-4', d: 'M 327.22246,520.39195 468.69667,460.28318 295.58263,414.6483 c 0,0 -56.61864,74.10382 31.63983,105.74365 z' },
  { id: '3-5', d: 'm 252.67449,600.60172 74.54797,-80.20977 141.47421,-60.10877 -116.4954,80.92445 z' },
  { id: '4-1', d: 'm 295.58263,414.6483 c -56.61865,83.26272 31.63983,105.74365 31.63983,105.74365 L 178.9889,575.61139 c 0,0 -177.0630188,-5.65809 -115.709239,-107.67495 61.353779,-102.01686 184.708289,-32.86078 184.708289,-32.86078 0,0 45.16854,-37.45152 43.49918,-93.04125 -1.66936,-55.58971 56.44109,-36.89287 56.44109,-36.89287 0,0 82.54,47.05973 85.87051,86.19321 3.33051,39.13347 -138.2161,23.31355 -138.2161,23.31355 z' },
  { id: '4-2', d: 'm 295.58263,414.6483 173.11404,45.63488 60.25704,-145.24233 -114.36791,42.11797 c 0,0 25.25732,31.3941 19.21293,41.66957 -16.65254,28.30932 -138.2161,15.81991 -138.2161,15.81991 z' },
  { id: '4-3', d: 'm 252.67449,600.60172 99.52678,-59.39409 116.4954,-80.92445 60.25704,-145.24233 82.36627,-2.52074 c 21.16207,2.93728 106.96051,108.5841 -36.42903,116.22074 79.98558,144.81042 -127.35872,102.23177 -191.03808,153.34766 z' },
  { id: '4-4', d: 'M 327.22246,520.39195 468.69667,460.28318 295.58263,414.6483 c 0,0 -56.61864,74.10382 31.63983,105.74365 z' },
  { id: '4-5', d: 'm 171.30984,576.3459 155.91262,-55.95395 141.47421,-60.10877 -116.4954,80.92445 -99.52678,59.39409 z' },
  { id: '5-1', d: 'm 295.58263,414.6483 c -162.3623,121.56357 31.63983,105.74365 31.63983,105.74365 L 178.9889,575.61139 c 0,0 -177.0630188,-5.65809 -115.709239,-107.67495 61.353779,-102.01686 184.708289,-32.86078 184.708289,-32.86078 0,0 45.16854,-37.45152 43.49918,-93.04125 -1.66936,-55.58971 56.44109,-36.89287 56.44109,-36.89287 0,0 82.54,47.05973 85.87051,86.19321 3.33051,39.13347 -138.2161,23.31355 -138.2161,23.31355 z' },
  { id: '5-2', d: 'm 298.91314,416.31355 37.39582,21.4887 -9.0865,82.5897 84.02294,-44.28885 -59.04413,65.10453 150.35163,-70.05226 154.62539,-121.97681 -5.05958,-48.31523 -133.42089,17.95443 -104.11202,38.34106 c 0,0 25.25732,31.3941 19.21293,41.66957 -16.65254,28.30932 -134.88559,17.48516 -134.88559,17.48516 z' },
  { id: '5-3', d: 'm 252.67449,600.60172 99.52678,-59.39409 147.02112,-71.7676 157.9559,-120.26147 -5.05958,-48.31523 c 21.16207,2.93728 111.64722,52.33493 -35.07282,129.07963 -43.24324,160.63033 -169.51366,101.02966 -233.19302,152.14555 z' },
  { id: '5-4', d: 'm 327.22246,520.39195 9.0865,-82.5897 -40.72633,-23.15395 c 0,0 -163.19491,114.06992 31.63983,105.74365 z' },
  { id: '5-5', d: 'm 171.30984,576.3459 155.91262,-55.95395 84.02294,-44.28885 -59.04413,65.10453 -99.52678,59.39409 z' },
]);

export function getBordersData() {
  return borders;
}

export function getBordersTimeline() {
  return {
    byYear: {
      1600: ['1-1', '1-2', '1-3', '1-4'],
      1710: ['2-1', '2-2', '2-3', '2-4'],
      1770: ['3-1', '3-2', '3-3', '3-4', '3-5'],
      1800: ['4-1', '4-2', '4-3', '4-4', '4-5'],
      1830: ['5-1', '5-2', '5-3', '5-4', '5-5']
    },
    allYears: [1600, 1710, 1770, 1800, 1830],
    current: []
  };
}

const countries = extractIds([
  { id: 'c1', name: 'Iam', color: '#3a3a00' },
  { id: 'c2', name: 'One', color: '#ccff00' },
  { id: 'c3', name: 'With', color: '#f44444' },
  { id: 'c4', name: 'The', color: '#dead00' },
  { id: 'c5', name: 'Force', color: '#133700' }
]);

export function getTerritoriesData() {
  return countries;
}

export function getBorderToCountry() {
  return { '1-1': 'c1',
    '1-2': 'c2',
    '1-3': 'c3',
    '1-4': 'c4',
    '2-1': 'c1',
    '2-2': 'c2',
    '2-3': 'c3',
    '2-4': 'c4',
    '3-1': 'c1',
    '3-2': 'c2',
    '3-3': 'c3',
    '3-4': 'c4',
    '3-5': 'c5',
    '4-1': 'c1',
    '4-2': 'c2',
    '4-3': 'c3',
    '4-4': 'c4',
    '4-5': 'c5',
    '5-1': 'c1',
    '5-2': 'c2',
    '5-3': 'c3',
    '5-4': 'c4',
    '5-5': 'c5' };
}
