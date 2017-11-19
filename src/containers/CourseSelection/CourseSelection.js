import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFlagsAction } from 'flag';

import { markItReady, cleanState } from '../../reducers/actions';
import TilesScreen from './TilesScreen';

class CourseSelection extends Component {
  componentWillMount() {
    this.enableCourseSelector();
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFlagAction: bindActionCreators(setFlagsAction, dispatch),
    markItReady: bindActionCreators(markItReady, dispatch),
    cleanState: bindActionCreators(cleanState, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelection);
