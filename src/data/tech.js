let locations = [
  {name:'Glasgow', loc: '150,150'},
  {name:'London', loc: '100,100'},
  {name:'Moscow', loc: '300,300'},
  {name:'Paris', loc: '50,300'},
  {name:'USA', loc: '400,500' },
  {name:'Canada', loc: '500,500' }
];

export default [
  {
    name: 'Steam engine',
    authors: ['James Watt'],
    description: 'Watt\'s ten-horsepower engines enabled a wide range of \
    manufacturing machinery to be powered. The engines could be sited anywhere \
    that water and coal or wood fuel could be obtained',
    year: '1781',
    location:[location[0]]
  },
  {
    name: 'Screw-cutting lathe',
    authors: ['Henry Maudslay'],
    description: 'Standardized screw thread sizes for the first time which in \
    turn allowed the application of interchangeable parts \
    (a prerequisite for mass production), were an important \
    foundation for the Industrial Revolution.',
    year: '1800',
    location:[location[1]]
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
    location:[location[2]]
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
    location:[location[3]]
  },
  {
    name:'Incandescent light bulb',
    authors:['Alexander Lodygin'],
    description:'He used as a burner two carbon rods of diminished section \
    in a glass receiver, hermetically sealed, and filled with nitrogen, \
    electrically arranged so that the current could be passed \
    to the second carbon when the first had been consumed',
    year:'1872',
    location:[location[2]]
  },
  {
    name:'Light bulb',
    authors:['Thomas Edison', 'Henry Woodward', 'Mathew Evans'],
    description:'lamp consisting of carbon rods mounted in \
    a nitrogen-filled glass cylinder',
    year:'1874',
    month:'07',
    day:'24',
    location:[location[4],location[5]]
  }
];
