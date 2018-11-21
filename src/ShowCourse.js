import React from 'react';
import { observer, inject } from 'mobx-react';

import LoadingScreen from './containers/LoadingScreen';
import UI from './containers/UI';
import Flag from './Flag';
import './ShowCourse.less';

@inject('store')
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
        {this.props.store.flags.flags.runtime.Setup === false && <UI />}
      </div>
    );
  }
}

export default ShowCourse;
