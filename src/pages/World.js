import React from 'react';
import { observer, inject } from 'mobx-react';
import { when } from 'mobx';

import TimePanel from '../templates/TimePanel/TimePanel';
import SidePanel from '../templates/SidePanel/SidePanel';
import Overlays from '../templates/Overlays/Overlays';
import MapViewport from '../containers/GeoLayers';

import Widgets from '../containers/Widgets';
import Balloon from '../containers/Balloon';
import FontLoader from '../containers/FontLoader';

@inject('store')
@observer
class World extends React.Component {
  componentDidMount() {
    // console.log('world mount', window.store.data.Courses.status.loaded);
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.selectWorld()
    );
  }

  selectWorld() {
    // won't redirect if backend is dead
    const course = this.props.store.effects.course.find('world');
    this.props.store.effects.course.select(course.id, course.url);
  }

  render() {
    return (
      <div className='content'>
        <Widgets />
        <FontLoader />
        <Overlays />
        <SidePanel />
        <TimePanel />
        <Balloon />
        <MapViewport />
      </div>
    );
  }
}

export default World;
