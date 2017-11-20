import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import { markItReady, cleanState } from '../../reducers/actions';
import TilesScreen from './TilesScreen';

class CourseSelection extends Component {
  componentWillMount() {
    this.enableCourseSelector();

  }

  checkCourses() {
    // e1!
    if (Object.keys(this.props.availableCourses).length < 1) {
      this.props.history.push('504');
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.coursesLoading === false && this.props.errorCourses !== false) {
      this.checkCourses();
    }
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
