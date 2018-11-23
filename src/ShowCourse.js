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
          courseSelected={this.props.match.params.id}
          fallbackRender={() => ''}
        />
        {this.props.store.flags.runtime.get('Setup') === false && <UI />}
      </div>
    );
  }
}

export default ShowCourse;
