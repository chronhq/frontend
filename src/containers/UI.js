import React from 'react';
import Flag from '../Flag';
import { observer, inject } from 'mobx-react';

import MapViewport from './GeoLayers';
import SidePanel from './SidePanel';
import TimePanel from '../components/TimePanel/TimePanel';
import Timeline from '../components/Timeline';

import Bio from '../components/Timeline/Bio';
import Widgets from './Widgets';

import Feedback from '../components/Feedback';
import Balloon from './Balloon';
import YearInput from '../components/TimePanel/YearInput';

import FontLoader from './FontLoader';

@inject('store')
@observer
class Overlays extends React.Component {
  render() {
    return (
      <div id='overlays'>
        <Feedback />
        {this.props.store.flags.flags.runtime.yearInput ? <YearInput /> : null}
      </div>
    );
  }
}

const UI = () => (
  <div className='content'>
    <Widgets />
    <FontLoader />
    <Flag
      name='runtime.SelectedCourse'
      render={() => <Bio />}
      fallbackRender={() => <Overlays />}
    />
    <Flag
      name="UI.Balloon"
      render={() => <Balloon />}
    />
    <Flag
      name="UI.SidePanel"
      render={() => <SidePanel />}
    />
    <Flag
      name="UI.TimePanel"
      render={() => <TimePanel />}
    />
    <Flag
      name="UI.MiniSidebar"
      render={() => <Timeline />}
    />
    <Flag
      name="UI.MapViewport"
      render={() => <MapViewport />}
    />
  </div>
);

export default UI;
