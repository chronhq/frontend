export function loadData(fetchList = []) {
  return {
    type: 'LOAD_DATA_SAGA',
    fetchList
  };
}

export function loadListOfCourses() {
  const listOfCourses = [{
    resource: 'COURSES',
    req: {
      filter: JSON.stringify({ where: { active: true } }),
    },
  }];
  return loadData(listOfCourses);
}

export function loadDataForCourse(id) {
  const filter = JSON.stringify({ where: { courseId: id } });
  const base = [
    {
      resource: 'BORDERS_TIMELINE',
      req: { filter },
    }, {
      resource: 'LOCATIONS',
      req: { key: 'places' },
    }, {
      resource: 'TERRAIN',
      req: { filter },
    }, {
      resource: 'PROPERTIES',
      req: { key: 'properties' },
    }, {
      resource: 'PROPERTIES_ADMIN',
      req: { key: 'admin' },
    }, {
      resource: 'PROPERTIES_TYPE',
      req: { key: 'type' },
    }, {
      resource: 'PERSONS',
    }, {
      resource: 'MAP_DECORATIONS',
    }, {
      resource: 'MAP_PICS',
    },
  ];

  const defaultViewData = [
    {
      resource: 'EVENTS_GEO',
      req: { key: 'byId' },
    }, {
      resource: 'INVENTIONS',
    },
  ];

  const courseViewData = [
    {
      resource: 'COURSE_TIMELINES',
      req: { filter, id: 'tick', key: 'tick' },
    }, {
      resource: 'COURSE_TRACES',
      req: { id: 'courseTimelineId', key: 'tick' }
    }, {
      resource: 'COURSE_GEOPOINTS',
      req: { id: 'courseTimelineId', key: 'tick' }
    },
  ];
  const list = id !== 0
    ? [...base, ...courseViewData]
    : [...base, ...defaultViewData];
  return loadData(list);
}
