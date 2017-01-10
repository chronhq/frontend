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

export function getCities() {
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

function getFacts() {
  return extractIds([
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
}

function getFactsByYear() {
  const facts = getFacts();
  const factsByYear = {};
  const factsIds = [];
  for (const id in facts) {
    factsIds.push(id);
    const year = facts[id].year;
    if (!(year in factsByYear)) {
      factsByYear[year] = [];
    }
    factsByYear[year].push(id);
  }
  return [factsByYear, factsIds];
}

export function getFactsData() {
  const [factsByYear, factsIds] = getFactsByYear();
  return {
    byId: getFacts(),
    allIds: factsIds,
    byYear: factsByYear,
    current: []
  };
}
