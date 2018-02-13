import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

// import { markItReady, cleanState } from '../../reducers/actions';
import TilesScreen from './TilesScreen';
import checkCourses from './checkCourses';

@observer
class CourseSelection extends React.Component {
  componentWillMount() {
    this.enableCourseSelector();
  }

  componentWillReceiveProps(next) {
    checkCourses(next);
  }

  enableCourseSelector() {
    this.props.store.flags.set({
      runtime: {
        CourseSelection: true,
        Ready: false
      }
    });
    // this.props.markItReady(false);
    // this.props.cleanState();
    // this.props.setFlagAction({ CourseSelection: true });
  }

  render() {
    return (
      <TilesScreen
        courses={this.props.store.bank.data.Courses}
      />
    );
  }
}

export default (withRouter(CourseSelection));
