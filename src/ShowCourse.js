import React from 'react';
import { observer } from 'mobx-react';
import LoadingScreen from './containers/LoadingScreen';
import UI from './containers/UI';
// import Flag from './Flag';
import './ShowCourse.less';

@observer
class ShowCourse extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <LoadingScreen
          {...this.props}
          courseSelected={this.props.computedMatch.params.id}
        />
        <UI />
      </div>
    );
  }
}

export default ShowCourse;
