import React from 'react';
import { observer } from 'mobx-react';
import LoadingScreen from './containers/LoadingScreen';
import UI from './containers/UI';
import Flag from './Flag';
import './ShowCourse.less';

@observer
class ShowCourse extends React.Component {
  render() {
    return (
      <div>
        <Flag
          name="runtime.CourseSelection"
          render={props => <LoadingScreen {...props} />}
          courseSelected={this.props.computedMatch.params.id}
          fallbackRender={() => ''}
        />
        <UI />
      </div>
    );
  }
}

export default ShowCourse;
