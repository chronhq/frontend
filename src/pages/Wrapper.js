import React, { Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { when, toJS, observable } from 'mobx';
import { ymHit } from '../metrikaHelper';

import LoadingLogo from '../containers/LoadingScreen/LoadingLogo';

// const CourseSelection = lazy(() => import('./CourseSelection'));
// const World = lazy(() => import('./World'));
// const Narrative = lazy(() => import('./Narrative'));

@inject('store')
@observer
class Wrapper extends React.Component {
  componentDidMount() {
    ymHit(this.props.match.params.id);
    this.props.store.effects.course.enableCourseSelection();
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.validateCourses()
    );
  }

  @observable component = () => '';

  lookCourses() {
    // #TODO firing two times in ainu
    const course = this.props.store.effects.course.find(this.props.match.params.id);
    if (course !== undefined) {
      this.props.store.effects.course.select(course.id, course.url);
      // this.component = (course.id === 0) ? World : Narrative;
    } else {
      this.props.history.push('/404');
    }
  }

  validateCourses() {
    const errorPages = {
      404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
    };
    const error = toJS(this.props.store.data.Courses.status.error);
    if (error !== null && typeof errorPages[toJS(error.status)] !== 'undefined') {
      this.props.history.push(`/${toJS(error.status)}`);
    }

    if (this.props.match.params.id !== undefined) {
      this.lookCourses();
    }
    //   this.component = CourseSelection;
    // } else {
    //   this.lookCourses();
    // }
  }

  render() {
    // const Component = this.component;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Wrapper);
