import React from 'react';
import { observer, inject } from 'mobx-react';
import { when, toJS } from 'mobx';
import { withRouter } from 'react-router-dom';

// import MapViewport from './GeoLayers';
import Overlays from '../templates/Overlays/Overlays';
import Timeline from '../templates/Timeline/Timeline';

import Bio from '../components/TimelineBio/Bio';
import Widgets from '../containers/Widgets';
import Balloon from '../containers/Balloon';
import FontLoader from '../containers/FontLoader';

@inject('store')
@observer
class Narrative extends React.Component {
  componentDidMount() {
    console.log('thisprops', this.props);
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.selectCourse()
    );
  }

  selectCourse() {
    // #TODO firing two times in ainu
    const course = this.props.store.effects.course.find(this.props.match.params.id);
    console.log('this.props.match.params.id', this.props.match.params.id);
    if (course !== undefined) {
      this.props.store.effects.course.select(course.id, course.url);
    } else {
      const errorPages = {
        404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
      };
      const error = toJS(this.props.store.data.Courses.status.error);
      if (error !== null
        && typeof errorPages[toJS(error.status)] !== 'undefined') {
        this.props.history.push(`/${toJS(error.status)}`);
      } else {
        this.props.history.push('/404');
      }
    }
  }

  render() {
    return (
      <div className='content'>
        <Widgets />
        <FontLoader />
        <Overlays />
        <Bio />
        <Timeline />
        <Balloon />
      </div>
    );
  }
}

export default withRouter(Narrative);
