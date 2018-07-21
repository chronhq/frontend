import React from 'react';
import Flag from '../Flag';

import MapViewport from './GeoLayers';
import SidePanel from './SidePanel';
import TimePanel from '../components/TimePanel/TimePanel';
import MapControls from '../components/MapControls';
import Timeline from '../components/Timeline';
// import LegendHOC from '../containers/LegendHOC';
import Bio from '../components/Timeline/Bio';
import Widgets from './Widgets';

import Feedback from '../components/Feedback';
import Intro from '../components/Intro/Carousel';
import PinBalloon from './PinBalloon';

const Overlays = () => (
  <div id='overlays'>
    <Intro />
    <Feedback />
    <PinBalloon />
  </div>
);

const UI = () => (
  <div className='content'>
    <Widgets />
    <Flag
      name='runtime.SelectedCourse'
      render={() => <Bio />}
      fallbackRender={() => <Overlays />}
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
      name="UI.MapControls-NotImplemented"
      render={() => <MapControls />}
    />
    <Flag
      name="UI.MapViewport"
      render={() => <MapViewport />}
    />
  </div>
);

export default UI;
