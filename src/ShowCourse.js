import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import LoadingScreen from './containers/LoadingScreen';
import UI from './containers/UI';
import Flag from './Flag';
import './ShowCourse.less';

@inject('store')
@observer
class ShowCourse extends React.Component {
  @computed get courseDataIsOk() {
    if (this.props.store.projection.enabled
      && this.props.store.flags.flags.runtime.Setup === false) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <Flag
          name="runtime.CourseSelection"
          render={props => <LoadingScreen {...props} />}
          courseSelected={this.props.computedMatch.params.id}
          fallbackRender={() => ''}
        />
        {this.courseDataIsOk === true && <UI />}
      </div>
    );
  }
}

export default ShowCourse;
