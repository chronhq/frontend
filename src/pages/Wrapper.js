import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { when, toJS } from 'mobx';
import { ymHit } from '../metrikaHelper';

@inject('store')
@observer
class Wrapper extends React.Component {
  componentDidMount() {
    ymHit(this.props.story);
    this.props.store.courseSelection.cleanup();
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.validateCourses()
    );
  }

  selectCourse() {
    const course = this.props.store.courseSelection.find(this.props.story);
    if (course !== undefined) {
      this.props.store.courseSelection.select(course.id, course.url);
    } else {
      this.props.history.push('/404');
    }
  }

  validateCourses() {
    const errorPages = {
      404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
    };
    const error = toJS(this.props.store.data.Courses.status.error);
    if (error !== null && errorPages[toJS(error.status)] !== undefined) {
      this.props.history.push(`/${toJS(error.status)}`);
    }
    if (this.props.story !== 'CourseSelection') {
      this.selectCourse();
    }
  }

  render() {
    return (
      <div className='content'>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Wrapper);
