import React from 'react';
import { observer, inject } from 'mobx-react';

import TilesScreen from '../templates/TilesScreen/TilesScreen';
import Wrapper from './Wrapper';

@inject('store')
@observer
class CourseSelection extends React.Component {
  componentWillMount() {
    this.props.store.effects.course.enableCourseSelection();
  }

  render() {
    return (
      <Wrapper story='CourseSelection'>
        <TilesScreen
          courses={this.props.store.data.Courses.data}
        />
      </Wrapper>
    );
  }
}

export default CourseSelection;
