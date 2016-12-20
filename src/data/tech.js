
let glasgow = {name:'Glasgow', cx: '150', cy: '150'};
let london = {name:'London', cx: '100', cy:'100'};
let moscow = {name:'Moscow', cx: '300', cy:'300'};
let paris = {name:'Paris', cx: '50', cy:'300'};
let usa = {name:'USA', cx: '400', cy:'500' };
let canada = {name:'Canada', cx: '500', cy:'500' };
let stockholm = {name: 'Stockholm', cx:'500', cy:'100'};
let berlin = {name: 'Stockholm', cx:'500', cy:'300'};



export default [
  {
    name: 'Maiden voyage of Vasa',
    authors: ['Söfring Hansson'],
    description: 'Vasa sank in full view of a crowd of hundreds, if not \
    thousands, of mostly ordinary Stockholmers who had come to see the great \
    ship set sail. The crowd included foreign ambassadors, in effect spies of \
    Gustavus Adolphus\' allies and enemies, who also witnessed the catastrophe.',
    year: '1628',
    location: [stockholm]
  },
  {
    name: 'Steam engine',
    authors: ['James Watt'],
    description: 'Watt\'s ten-horsepower engines enabled a wide range of \
    manufacturing machinery to be powered. The engines could be sited anywhere \
    that water and coal or wood fuel could be obtained',
    year: '1781',
    location:[glasgow]
  },
  {
    name: 'Screw-cutting lathe',
    authors: ['Henry Maudslay'],
    description: 'Standardized screw thread sizes for the first time which in \
    turn allowed the application of interchangeable parts \
    (a prerequisite for mass production), were an important \
    foundation for the Industrial Revolution.',
    year: '1800',
    location:[london]
  },
  {
    name:'Neptune discovered',
    authors:['Johann Gottfried Galle'],
    description:'The first two thirds of Neptune is composed of a mixture of \
    molten rock, water, liquid ammonia and methane. The outer third is a \
    mixture of heated gases comprised of hydrogen, helium, water and methane. \
    Methane gives Neptune its blue cloud color.',
    year: '1846',
    month: '09',
    day:'23',
    location:[berlin]
  },
  {
    name:'Incandescent light bulb',
    authors:['Alexander Lodygin'],
    description:'He used as a burner two carbon rods of diminished section \
    in a glass receiver, hermetically sealed, and filled with nitrogen, \
    electrically arranged so that the current could be passed \
    to the second carbon when the first had been consumed',
    year:'1872',
    location:[moscow]
  },
  {
    name:'Light bulb',
    authors:['Thomas Edison', 'Henry Woodward', 'Mathew Evans'],
    description:'lamp consisting of carbon rods mounted in \
    a nitrogen-filled glass cylinder',
    year:'1874',
    month:'07',
    day:'24',
    location:[usa,canada]
  },
  {
    name: 'Smokeless Powder',
    authors: ['Dmitry Mendeleev'],
    description: 'When ignited, it will burn/explode quickly, and with \
    excessive heat output. If ignited in a tight, contained space, it will \
    leave little to no remnants, such as unburned powder, particular kinds \
    of flame scarring, or smoke of any kind.',
    year: '1891',
    month: '01',
    day: '23',
    location:[moscow]
  },
  {
    name: 'Diesel engine',
    authors: ['Rudolph Diesel'],
    description: 'The definition of a "Diesel" engine to many has become an \
    engine that uses compression ignition. To some it may be an engine that \
    uses heavy fuel oil. To others an engine that does not use spark ignition.',
    year: '1892',
    month: '02',
    day: '23',
    location:[paris]
  }
];
