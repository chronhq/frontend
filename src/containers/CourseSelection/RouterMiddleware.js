import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';
import { withRouter } from 'react-router-dom';

import 'font-awesome/less/font-awesome.less';
import './RouterMiddleware.less';

import { loadDataForCourse,
  markItReady,
  setProjection,
  setVisibility,
  defaultScaleChange,
  setMapDimensions,
} from '../../reducers/actions';
import RotatingLogo from './RotatingLogo';

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
    if (notLoaded === 0) {
      const uiSettings = this.props.availableCourses[this.state.selected].config.settings;
      const mapDimensions = this.props.availableCourses[this.state.selected].projected;
      this.props.setMapDimensions(mapDimensions);
      this.props.markItReady(true);
      this.props.setFlagsAction({
        CourseSelection: false,
        SelectedCourse: this.state.selected,
        SelectedCourseName: this.props.id,
        ...uiSettings.flags
      });
      if ('visibility' in uiSettings) {
        this.props.setVisibility(uiSettings.visibility);
      }
      if ('zoom' in uiSettings) {
        this.props.defaultScaleChange(
          uiSettings.zoom.minScale,
          uiSettings.zoom.maxScale);
      }
    }

    // TODO Check for projected data
  }

  selectCourse(availableCourses, name) {
    const course = Object.values(availableCourses).find(cur => cur.url === name);
    if (course !== undefined) {
      this.setState({ loading: true, course: Boolean(course.id), selected: course.id });

      this.props.setProjection(availableCourses[course.id].config.projection);

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
      <div className='loading-screen'>
        <RotatingLogo />
      </div>
    );
  }
}

const getLoadedStatus = data => ({
  loaded: data.loaded,
  loading: data.loading || false,
  error: data.error || false,
});

function mapStateToProps(state) {
  return {
    availableCourses: state.courses.list.byId || {},
    coursesLoaded: state.courses.list.loaded,
    flags: {
      SelectedCourse: state.flags.SelectedCourse,
      SelectedCourseName: state.flags.SelectedCourseName,
    },
    courses: {
      timeline: getLoadedStatus(state.courses.timeline),
      traces: getLoadedStatus(state.courses.traces),
    },
    full: {
      inventions: getLoadedStatus(state.timeline.inventions),
      geoEvents: getLoadedStatus(state.timeline.geoEvents),
      inventionsData: getLoadedStatus(state.data.inventions),
      geoEventsData: getLoadedStatus(state.data.geoEvents),
    },
    timeline: {
      locations: getLoadedStatus(state.timeline.locations),
      borders: getLoadedStatus(state.timeline.borders),
      personsFacts: getLoadedStatus(state.timeline.personsFacts),
      personsAlive: getLoadedStatus(state.timeline.personsAlive),
    },
    data: {
      mapDecorations: getLoadedStatus(state.data.mapDecorations),
      mapPics: getLoadedStatus(state.data.mapPics),
      mapLabels: getLoadedStatus(state.data.mapLabels),
      locations: getLoadedStatus(state.data.locations),
      borders: getLoadedStatus(state.data.borders),
      persons: getLoadedStatus(state.data.persons),
      terrain: getLoadedStatus(state.data.terrain),
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
    setMapDimensions: bindActionCreators(setMapDimensions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RouterMiddleware));