import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ym from 'react-yandex-metrika';
import { observer } from 'mobx-react';
import { when } from 'mobx';


import 'font-awesome/less/font-awesome.less';
import './RouterMiddleware.less';

// import checkCourses from './checkCourses';
import RotatingLogo from './RotatingLogo';

@observer
class RouterMiddleware extends Component {
  componentWillMount() {
    // console.log('Router middleware', this.props);
    // ym('hit', this.props.courseSelected);
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.selectCourse()
    );
  }

  selectCourse() {
    const course = this.props.store.effects.course.find(this.props.courseSelected);
    if (course !== undefined) {
      this.props.store.effects.course.select(course.id, course.url);
    } else {
      this.props.history.push('404');
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

export default (withRouter(RouterMiddleware));
