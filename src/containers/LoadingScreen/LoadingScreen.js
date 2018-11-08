import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { when, toJS } from 'mobx';

import { ymHit } from '../../metrikaHelper';
import './LoadingScreen.less';

import checkCourses from '../../components/checkCourses';
import LoadingLogo from './LoadingLogo';

@observer
class LoadingScreen extends React.Component {
  componentWillMount() {
    ymHit(this.props.courseSelected);
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.selectCourse()
    );
  }

  componentWillReceiveProps(next) {
    checkCourses(next);
  }

  selectCourse() {
    const course = this.props.store.effects.course.find(this.props.courseSelected);
    if (course !== undefined) {
      this.props.store.effects.course.select(course.id, course.url);
    } else {
      const errorPages = {
        404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
      };
      const error = toJS(this.props.store.data.Courses.status.error);
      if (error !== null
        && typeof errorPages[toJS(error.status)] !== 'undefined') {
        this.props.history.push(`${toJS(error.status)}`);
      } else {
        this.props.history.push('404');
      }
    }
  }

  render() {
    return (
      <div className='loading-screen'>
        <LoadingLogo i18n={this.props.store.i18n} />
      </div>
    );
  }
}

export default (withRouter(LoadingScreen));
