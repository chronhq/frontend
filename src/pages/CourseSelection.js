import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { when, toJS } from 'mobx';

import TilesScreen from '../templates/TilesScreen/TilesScreen';
import { ymHit } from '../metrikaHelper';

import Wrapper from './Wrapper';

@inject('store')
@observer
class CourseSelection extends React.Component {
  componentWillMount() {
    this.props.store.effects.course.enableCourseSelection();
  //   when( // validate course name and download data
  //     () => this.props.store.data.Courses.status.loaded,
  //     () => this.validateCourses()
  //   );
  }

  // validateCourses() {
  //   const errorPages = {
  //     404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
  //   };
  //   const error = toJS(this.props.store.data.Courses.status.error);
  //   if (error !== null
  //     && typeof errorPages[toJS(error.status)] !== 'undefined') {
  //     this.props.history.push(`/${toJS(error.status)}`);
  //   }
  // }

  render() {
    return (
      <Wrapper match={this.props.match}>
        <TilesScreen
          courses={this.props.store.data.Courses.data}
        />
      </Wrapper>
    );
  }
}

export default (withRouter(CourseSelection));
