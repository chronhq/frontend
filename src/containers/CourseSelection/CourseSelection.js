import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import { markItReady, cleanState } from '../../reducers/actions';
import TilesScreen from './TilesScreen';
import checkCourses from './checkCourses';

class CourseSelection extends Component {
  componentWillMount() {
    this.enableCourseSelector();
  }

  componentWillReceiveProps(next) {
    checkCourses(next);
  }

  enableCourseSelector() {
    this.props.markItReady(false);
    this.props.cleanState();
    this.props.setFlagAction({ CourseSelection: true });
  }

  render() {
    return (
      <TilesScreen
        courses={this.props.availableCourses}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    availableCourses: state.courses.list.byId || {},
    coursesLoading: state.courses.list.loading,
    coursesLoaded: state.courses.list.loaded,
    errorCourses: state.courses.list.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFlagAction: bindActionCreators(setFlagsAction, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
    cleanState: bindActionCreators(cleanState, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CourseSelection));
