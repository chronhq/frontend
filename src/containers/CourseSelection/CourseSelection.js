import React, { Component } from 'react';
import { connect } from 'react-redux';


import TilesScreen from './TilesScreen';

class CourseSelection extends Component {
  state = {
    loading: false,
    course: false,
    selected: null,
  }

  render() {
    return (
      <TilesScreen
        courses={this.props.availableCourses}
        loading={this.state.loading}
        selected={this.state.selected}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    availableCourses: state.courses.list.byId || {},
  };
}

export default connect(mapStateToProps)(CourseSelection);
