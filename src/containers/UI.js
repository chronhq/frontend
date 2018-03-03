import React from 'react';
import Flag from '../Flag';

import MapViewport from '../containers/MapViewport';
import SidePanel from '../containers/SidePanel';
import TimePanel from '../components/TimePanel';
import MapControls from '../components/MapControls';
import MiniSidebar from '../components/Timeline/MiniSidebar';
import LegendHOC from '../containers/LegendHOC';
import Bio from '../components/Timeline/Bio';

import Feedback from '../components/Feedback';
import Intro from '../components/Intro/Carousel';


const Overlays = () => (
  <div id='overlays'>
    <Intro />
    <Feedback />
  </div>
);

const UI = () => (
  <div className='content'>
    <Flag
      name='runtime.SelectedCourse'
      render={() => ''}
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
      name="UI.MiniSidebar-NotImplemented"
      render={() => <MiniSidebar />}
    />
    <Flag
      name="UI.MapControls-NotImplemented"
      render={() => <MapControls />}
    />
    <Flag
      name="UI.MapViewport"
      render={() => <MapViewport />}
    />
    <Flag
      name="UI.LegendHOC"
      render={() => <LegendHOC />}
    />
    <Flag
      name="UI.Bio-NotImplemented"
      render={() => <Bio />}
    />
  </div>
);

export default UI;
