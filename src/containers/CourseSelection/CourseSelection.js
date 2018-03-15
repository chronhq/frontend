import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

import TilesScreen from './TilesScreen';
import checkCourses from './checkCourses';
import { ymHit } from '../../metrikaHelper';
@observer
class CourseSelection extends React.Component {
  componentWillMount() {
    ymHit('courseSelection');
    this.enableCourseSelector();
  }

  componentWillReceiveProps(next) {
    checkCourses(next);
  }

  enableCourseSelector() {
    this.props.store.flags.set({
      runtime: {
        CourseSelection: true,
        Ready: false
      }
    });
  }

  render() {
    return (
      <TilesScreen
        courses={this.props.store.data.Courses.data}
      />
    );
  }
}

export default (withRouter(CourseSelection));
