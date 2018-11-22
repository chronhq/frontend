import React from 'react';
import Flag from '../Flag';

import MapViewport from './GeoLayers';

import TimePanel from '../templates/TimePanel/TimePanel';
import SidePanel from '../templates/SidePanel/SidePanel';
import Overlays from '../templates/Overlays/Overlays';
import Timeline from '../templates/Timeline/Timeline';

import Bio from '../components/TimelineBio/Bio';
import Widgets from './Widgets';
import Balloon from './Balloon';
import FontLoader from './FontLoader';

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
