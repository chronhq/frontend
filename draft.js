// Course:
// id, courseName, author, description, date

// CourseTimeline:
// id, year, tick, courseId

// CourseData:
// id, courseTimelineId, type, json
// type enum, // ( text, trace, battle, focus, map? )

const types = [
  {
    // type: text
    // this is for formatted text in feed
    text: [
      'paragraph',
      ['listItem1', 'listItem2 '],
      'paragraph',
      'link to location (({locName}))' // This is how hell looks like, there must be another way
    ],
    links: {
      locName: {
        location: ['lat', 'lon'],
        title: 'Some battlefield'
      }
    }
  },
  {
    // type: 'trace',
    // this type defines journey or expedition
    // 'path' must be separated into single table
    pathData: {
      path: [[0, 0], [0.1, 0], [0.2, 0.3], [0.5, 0.7]], // List of key [lat,lon] coordinates
      vehicle: 'caravan|ship|car', // pick from the defined enum
      affiliation: { color: '13', leader: 'Mr. Spock', name: 'Mission' } // to whom this expedition belongs to
    },
    showPreviousPath: false,
    showNextPath: false,
    // start and end position of movement
    // mb set to auto
    movement: [1, 3], // index of point in path for start and end in this turn
    years: [1999, 2000] // start-end year
  },
  {
    // type: battle
    aggressor: [], // list of countries
    defenders: [], // list of countries
    weaponry: 'ancient|middle|modern|nature', // enum of defined pictures
    draw: false,
    victory: false, // if true - aggressor won the battle
    location: ['lon', 'lat'], // point of battle
    title: 'Some hover pop-up text'
  },
  // {
  //   // type: focus
  //   // Describes which borders must be bold

  // }
];

return types;
