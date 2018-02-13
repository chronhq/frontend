import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ym from 'react-yandex-metrika';
import { observer } from 'mobx-react';
import { computed, when, observable } from 'mobx';


import 'font-awesome/less/font-awesome.less';
import './RouterMiddleware.less';

// import checkCourses from './checkCourses';
import RotatingLogo from './RotatingLogo';

@observer
class RouterMiddleware extends Component {
  componentWillMount() {
    console.log('Router middleware', this.props);
    when( // validate course name and download data
      () => (this.coursesLoaded && this.loading === false),
      () => this.startLoading()
    );
    when(
      () => this.loadingIsComplete,
      () => this.finalize()
    );
  }

  @computed get coursesLoaded() {
    return this.props.store.data.Courses.length > 0;
  }

  @computed get availableCourses() {
    // TODO filter by active
    return this.props.store.data.Courses.data;
  }
  @computed get courseInfo() {
    return this.availableCourses[this.selected];
  }
  @computed get dependencies() {
    return this.course
      ? [] // Ainu course
      : [ // World map
        'Admins',
        'Borders',
        'Cities',
        'Contours',
        'Geometries',
        'Properties',
        'Types',
      ];
  }
  @computed get loadingIsComplete() {
    return this.dependencies.every(d =>
      this.props.store.data[d].status.loaded)
      && this.props.store.borders.ready;
  }

  finalize() {
    console.log('Finalize course selection');
    const uiSettings = this.courseInfo.config.settings;
    this.props.store.flags.set({
      runtime: {
        Ready: true,
        CourseSelection: false,
      },
      UI: {
        ...uiSettings.flags
      }
    });
    ym('hit', this.props.courseSelected);
    // if ('visibility' in uiSettings) {
    //   this.props.setVisibility(uiSettings.visibility);
    // }
    // if ('zoom' in uiSettings) {
    //   this.props.defaultScaleChange(
    //     uiSettings.zoom.minScale,
    //     uiSettings.zoom.maxScale);
    // }
  }

  selectCourse(availableCourses, name) {
    const course = Object.values(availableCourses).find(cur => cur.url === name);
    if (course !== undefined) {
      this.loading = true;
      this.course = Boolean(course.id);
      this.selected = course.id;
      console.log(this.courseInfo);

      this.props.store.year.setup(this.courseInfo.config.year);

      this.props.store.projection.setup(this.courseInfo.config.projection);

      this.props.store.flags.set({
        runtime: {
          SelectedCourse: this.selected,
          SelectedCourseName: this.props.courseSelected,
        }
      });

      this.props.store.borders.loadBorders();
      this.props.store.borders.loadGeometry();
      const autoLoad = this.dependencies.filter(c => (
        c !== 'Geometries' && c !== 'Borders'));
      this.props.store.data.resolveDependencies(autoLoad);
      // this.props.loadDataForCourse(course.id);
    } else {
      this.props.history.push('404');
    }
  }
  startLoading() {
    // checkCourses();
    if (this.coursesLoaded && this.props.courseSelected !== null) {
      this.selectCourse(this.availableCourses, this.props.courseSelected);
    } else {
      console.log('abort startLoading', this.coursesLoaded, this.props.courseSelected);
    }
  }

  @observable loading = false;
  @observable course = false;
  @observable selected = null;


  render() {
    return (
      <div className='loading-screen'>
        <RotatingLogo />
      </div>
    );
  }
}

// const getLoadedStatus = data => ({
//   loaded: data.loaded,
//   loading: data.loading || false,
//   error: data.error || false,
// });

// function mapStateToProps(state) {
//   return {
//     availableCourses: state.courses.list.byId || {},
//     coursesLoading: state.courses.list.loading,
//     coursesLoaded: state.courses.list.loaded,
//     errorCourses: state.courses.list.error,
//     flags: {
//       SelectedCourse: state.flags.SelectedCourse,
//       SelectedCourseName: state.flags.SelectedCourseName,
//     },
//     courses: {
//       timeline: getLoadedStatus(state.courses.timeline),
//       traces: getLoadedStatus(state.courses.traces),
//     },
//     full: {
//       inventions: getLoadedStatus(state.timeline.inventions),
//       geoEvents: getLoadedStatus(state.timeline.geoEvents),
//       inventionsData: getLoadedStatus(state.data.inventions),
//       geoEventsData: getLoadedStatus(state.data.geoEvents),
//     },
//     timeline: {
//       locations: getLoadedStatus(state.timeline.locations),
//       borders: getLoadedStatus(state.timeline.borders),
//       personsFacts: getLoadedStatus(state.timeline.personsFacts),
//       personsAlive: getLoadedStatus(state.timeline.personsAlive),
//     },
//     data: {
//       mapDecorations: getLoadedStatus(state.data.mapDecorations),
//       mapPics: getLoadedStatus(state.data.mapPics),
//       mapLabels: getLoadedStatus(state.data.mapLabels),
//       locations: getLoadedStatus(state.data.locations),
//       borders: getLoadedStatus(state.data.borders),
//       persons: getLoadedStatus(state.data.persons),
//       terrain: getLoadedStatus(state.data.terrain),
//     },
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     loadDataForCourse: bindActionCreators(loadDataForCourse, dispatch),
//     markItReady: bindActionCreators(markItReady, dispatch),
//     setProjection: bindActionCreators(setProjection, dispatch),
//     setFlagsAction: bindActionCreators(setFlagsAction, dispatch),
//     setVisibility: bindActionCreators(setVisibility, dispatch),
//     defaultScaleChange: bindActionCreators(defaultScaleChange, dispatch),
//     setMapDimensions: bindActionCreators(setMapDimensions, dispatch),
//     changeInitialYear: bindActionCreators(changeInitialYear, dispatch),
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RouterMiddleware));
export default (withRouter(RouterMiddleware));
