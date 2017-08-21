import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import RotatingLogo from './RotatingLogo';
import { loadData, markItReady } from '../../reducers/actions';

import './CourseSelection.less';

const getIcon = (e) => {
  if (e.loaded) {
    return 'fa-check';
  } else if (e.loading) {
    return 'fa-spinner';
  }
  return 'fa-times';
};
const sumLoading = obj =>
  Object.keys(obj).reduce((prev, curId) => prev + Number(!obj[curId].loaded), 0);

const LoadingListElement = ({ element }) => (
  <li><i className={`fa ${getIcon(element)}`} aria-hidden="true" />{element.name}</li>
);

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
  componentDidMount() {
    this.props.loadData(listOfCourses);
  }
  componentWillReceiveProps(next) {
    const notLoaded = sumLoading(next.timeline) + sumLoading(next.data);
    // TODO Check for projected data
    if (notLoaded === 0) {
      this.props.markItReady(true);
      this.props.setFlagsAction({ CourseSelection: false });
    }
  }
  selectCourse(id) {
    this.props.loadData(requestData(id));
  }
  courseButton(course) {
    const key = `courseSelector_id${course.id}`;
    return (
      <button key={key} onClick={() => this.selectCourse(course.id)}>{course.name}</button>
    );
  }
  render() {
    return (
      <div className='loadingPage'>
        <RotatingLogo className='logo' />
        <br />
        {this.courseButton({ name: 'Загрузить данные', id: 0 })}
        {Object.keys(this.props.courses.list.byId).map(
          c => this.courseButton(this.props.courses.list.byId[c]))
        }
        <ul>
          {Object.keys(this.props.timeline).map(t =>
            (<LoadingListElement
              key={`timeline_${t}`}
              element={this.props.timeline[t]}
            />))}
          {Object.keys(this.props.data).map(t =>
            (<LoadingListElement
              key={`data_${t}`}
              element={this.props.data[t]}
            />))}
        </ul>
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
    timeline: {
      locations: getLoadedStatus('Перечень мест', state.timeline.locations),
      inventions: getLoadedStatus('Список изобретений', state.timeline.inventions),
      borders: getLoadedStatus('Перечень границ', state.timeline.borders),
      personsFacts: getLoadedStatus('Годы жизни великих людей', state.timeline.personsFacts),
      personsAlive: getLoadedStatus('Годы жизни великих людей', state.timeline.personsAlive),
      geoEvents: getLoadedStatus('Годы жизни великих людей', state.timeline.geoEvents),
    },
    data: {
      locations: getLoadedStatus('География мест', state.data.locations),
      inventions: getLoadedStatus('География изобретений', state.data.inventions),
      borders: getLoadedStatus('Политические границы', state.data.borders),
      geoEvents: getLoadedStatus('Описание изменений', state.data.geoEvents),
      persons: getLoadedStatus('Информация о людях', state.data.persons),
      terrain: getLoadedStatus('Физическая карта мира', state.data.terrain),
    },
    courses: state.courses,
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
