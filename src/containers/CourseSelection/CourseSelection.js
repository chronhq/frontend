import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import RotatingLogo from './RotatingLogo';
import { loadData, markItReady } from '../../reducers/actions';

import TilesScreen from './TilesScreen';

const sumLoading = obj =>
  Object.keys(obj).reduce((prev, curId) => prev + Number(!obj[curId].loaded), 0);

const requestData = (id) => {
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
      req: { filter, key: 'tick' },
    }, {
      resource: 'COURSE_EVENTS',
    }, {
      resource: 'COURSE_TRACES',
    },
  ];
  return id !== 0
    ? [...base, ...courseViewData]
    : [...base, ...defaultViewData];
};

const listOfCourses = [{
  resource: 'COURSES',
  req: {
    filter: JSON.stringify({ where: { active: true } }),
  },
}];

class CourseSelection extends Component {
  state = {
    loading: false,
    course: false,
    selected: null,
  }

  componentDidMount() {
    this.props.loadData(listOfCourses);
  }
  componentWillReceiveProps(next) {
    const notLoaded = this.state.course
      ? sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.courses)
      : sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.full);
    // TODO Check for projected data
    if (notLoaded === 0) {
      this.props.markItReady(true);
      this.props.setFlagsAction({ CourseSelection: false, ...this.toggleUI });
    }
  }

  get toggleUI() {
    return this.state.course
      ? { UI: { TimePanel: false } }
      : { UI: { TimePanel: true } };
  }

  selectCourse(id) {
    this.setState({ loading: true, course: Boolean(id), selected: id });
    this.props.loadData(requestData(id));
  }

  render() {
    return (
      <div className='loadingPage'>
        <RotatingLogo className='logo' />
        <br />
        <TilesScreen
          courses={this.props.availableCourses}
          loading={this.state.loading}
          selected={this.state.selected}
          selectCourse={id => this.selectCourse(id)}
        />
      </div>
    );
  }
}

const getLoadedStatus = (name, data) => ({
  name,
  loaded: data.loaded,
  loading: data.loading || false,
  error: data.error || false,
});

function mapStateToProps(state) {
  return {
    courses: {
      events: getLoadedStatus('Перечень событий', state.courses.events),
      timeline: getLoadedStatus('Хронология событий', state.courses.timeline),
      traces: getLoadedStatus('История путешествий', state.courses.traces),
    },
    full: {
      inventions: getLoadedStatus('Список изобретений', state.timeline.inventions),
      geoEvents: getLoadedStatus('Годы жизни великих людей', state.timeline.geoEvents),
      inventionsData: getLoadedStatus('География изобретений', state.data.inventions),
      geoEventsData: getLoadedStatus('Описание изменений', state.data.geoEvents),
    },
    timeline: {
      locations: getLoadedStatus('Перечень мест', state.timeline.locations),
      borders: getLoadedStatus('Перечень границ', state.timeline.borders),
      personsFacts: getLoadedStatus('Годы жизни великих людей', state.timeline.personsFacts),
      personsAlive: getLoadedStatus('Годы жизни великих людей', state.timeline.personsAlive),
    },
    data: {
      locations: getLoadedStatus('География мест', state.data.locations),
      borders: getLoadedStatus('Политические границы', state.data.borders),
      persons: getLoadedStatus('Информация о людях', state.data.persons),
      terrain: getLoadedStatus('Физическая карта мира', state.data.terrain),
    },
    availableCourses: state.courses.list.byId || {},
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadData: bindActionCreators(loadData, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CourseSelection);
