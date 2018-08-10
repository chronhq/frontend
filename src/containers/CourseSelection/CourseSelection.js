import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { when, toJS } from 'mobx';

import TilesScreen from './TilesScreen';
import checkCourses from './checkCourses';
import { ymHit } from '../../metrikaHelper';

@observer
class CourseSelection extends React.Component {
  componentWillMount() {
    ymHit('courseSelection');
    this.props.store.effects.course.enableCourseSelection();
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.validateCourses()
    );
  }

  componentWillReceiveProps(next) {
    checkCourses(next);
  }

  validateCourses() {
    const errorPages = {
      404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
    };
    const error = toJS(this.props.store.data.Courses.status.error);
    if (error !== null
      && typeof errorPages[toJS(error.status)] !== 'undefined') {
      this.props.history.push(`${toJS(error.status)}`);
    }
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
