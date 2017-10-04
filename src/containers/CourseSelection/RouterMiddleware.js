import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import { loadDataForCourse,
  markItReady,
  setProjection,
  setVisibility,
  defaultScaleChange,
} from '../../reducers/actions';

import { withRouter } from 'react-router-dom'

const sumLoading = obj =>
  Object.keys(obj).reduce((prev, curId) => prev + Number(!obj[curId].loaded), 0);

class RouterMiddleware extends Component {
  state = {
    loading: false,
    course: false,
    selected: null,
  }

  componentDidMount() {
    this.startLoading(this.props.coursesLoaded, this.props.availableCourses);
  }

  componentWillReceiveProps(next) {
    if (next.coursesLoaded === true
      && this.state.loading !== true) {
      // we need to force loading, because 'nextProps' not yet installed
      this.startLoading(next.coursesLoaded, next.availableCourses);
    }
    const notLoaded = this.state.course
      ? sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.courses)
      : sumLoading(next.timeline) + sumLoading(next.data) + sumLoading(next.full);
    // console.log(sumLoading(next.timeline), sumLoading(next.data), sumLoading(next.full));
    if (notLoaded === 0) {
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

  selectCourse(availableCourses, name) {
    const course = Object.values(availableCourses).find(cur => cur.url === name);
    if (course !== undefined) {
      this.setState({ loading: true, course: Boolean(course.id), selected: course.id });

      this.props.setProjection(availableCourses[course.id].projection);

      this.props.loadDataForCourse(course.id);
    } else {
      this.props.history.push('404');
    }
  }
  startLoading(coursesLoaded, availableCourses) {
    if (coursesLoaded && this.props.id !== null) {
      this.selectCourse(availableCourses, this.props.id);
    }
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
    coursesLoaded: state.courses.list.loaded,
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
    loadDataForCourse: bindActionCreators(loadDataForCourse, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
    setProjection: bindActionCreators(setProjection, dispatch),
    setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
    setVisibility: bindActionCreators(setVisibility, dispatch),
    defaultScaleChange: bindActionCreators(defaultScaleChange, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RouterMiddleware));