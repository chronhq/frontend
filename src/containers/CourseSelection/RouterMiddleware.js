import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import { loadData,
  markItReady,
  setProjection,
  setVisibility,
  defaultScaleChange,
} from '../../reducers/actions';

import { withRouter } from 'react-router-dom'

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

class RouterMiddleware extends Component {
  state = {
    loading: false,
    course: false,
    selected: null,
    shouldupdate: true,
  }

  componentDidMount() {
    this.props.loadData(listOfCourses);
    this.selectCourse(this.props.id);
    // console.log(typeof(this.props.id));
  }

  componentWillReceiveProps(next) {
    const notLoaded = this.state.course
      ? sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.courses)
      : sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.full);
    // console.log(sumLoading(next.timeline), sumLoading(next.data), sumLoading(next.full));
    if (notLoaded === 0) {
      console.log('mark1');
      const uiSettings = this.toggleUI;
      this.props.markItReady(true);
      this.props.setFlagsAction({ CourseSelection: false, ...uiSettings.flags });
      if ('visibility' in uiSettings) {
        this.props.setVisibility(uiSettings.visibility);
      }
      if ('zoom' in uiSettings) {
        this.props.defaultScaleChange(
          uiSettings.zoom.minScale,
          uiSettings.zoom.maxScale,
          uiSettings.zoom.mapWidth,
          uiSettings.zoom.mapShift);
      }
    }

    // TODO Check for projected data
    if (this.props.availableCourses[this.props.id] !== next.availableCourses[this.props.id]) {
      this.props.setProjection(next.availableCourses[this.props.id].projection);
      // if (!(this.props.id in next.availableCourses)) {
      // // if 
      //   this.props.history.push('404');
      // };
    }
  }

  get toggleUI() {
    return this.state.course
      ? { flags: { UI: { TimePanel: false, SidePanel: false, MiniSidebar: true } },
        visibility: {
          borders: 1,
          locations: 1,
          tooltips: 1,
          scale: 10
        },
        zoom: {
          minScale: 4,
          maxScale: 20,
          mapWidth: 300,
          mapShift: [-350, -150],
        },
      }
      : { flags: { UI: { TimePanel: true, SidePanel: true, MiniSidebar: false } } };
  }

  selectCourse(id) {
    this.setState({ loading: true, course: Boolean(id), selected: id });
    // this.props.setProjection(this.props.availableCourses[this.props.id].projection);
    this.props.loadData(requestData(id));
  }

  render() {
    return (
      <div className='text-center'>
        <h3> Router Middleware</h3>
        <i className='fa fa-circle-o-notch fa-spin fa-2x fa-fw' />
        <span className='sr-only'>Loading...</span>
        {/*
        <button onClick={() => this.selectCourse()}> Click </button>
      */}
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
    availableCourses: state.courses.list.byId || {},
    courses: {
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
      mapDecorations: getLoadedStatus('Расположение украшений', state.data.mapDecorations),
      mapPics: getLoadedStatus('Иконки и картинки', state.data.mapPics),
      locations: getLoadedStatus('География мест', state.data.locations),
      borders: getLoadedStatus('Политические границы', state.data.borders),
      persons: getLoadedStatus('Информация о людях', state.data.persons),
      terrain: getLoadedStatus('Физическая карта мира', state.data.terrain),
    },
  };
}
function mapDispatchToProps(dispatch) {
  return {
    loadData: bindActionCreators(loadData, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
    setProjection: bindActionCreators(setProjection, dispatch),
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
    setVisibility: bindActionCreators(setVisibility, dispatch),
    defaultScaleChange: bindActionCreators(defaultScaleChange, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RouterMiddleware));