import React from 'react';
import Flag from '../Flag';

import MapViewport from './GeoLayers';

import TimePanel from '../templates/TimePanel/TimePanel';
import SidePanel from '../templates/SidePanel/SidePanel';
import Overlays from '../templates/Overlays/Overlays';
import Timeline from '../templates/Timeline/Timeline';

import Widgets from './Widgets';
import Balloon from './Balloon';
import FontLoader from './FontLoader';

const UI = () => (
  <div className='content'>
    <Widgets />
    <FontLoader />
    <Overlays />
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
