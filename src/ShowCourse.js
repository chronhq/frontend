import React from 'react';
import { observer } from 'mobx-react';
import RouterMiddleware from './containers/CourseSelection/RouterMiddleware';
import UI from './containers/UI';
import Flag from './Flag';
// import DevTools from './DevTools';
import './ShowCourse.less';

@observer
class ShowCourse extends React.Component {
  render() {
    return (
      <div id='showCourse'>
        <Flag
          name="runtime.CourseSelection"
          render={props => <RouterMiddleware {...props} />}
          courseSelected={this.props.computedMatch.params.id}
          fallbackRender={() => <UI />}
        />
      </div>
    );
  }
}

export default ShowCourse;
