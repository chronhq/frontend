import React from 'react';
import { Flag } from 'flag';

import MapViewport from '../containers/MapViewport';
import SidePanel from '../components/SidePanel';
import TimePanel from '../components/TimePanel';
import MapControls from '../components/MapControls';
import MapClickInfo from '../components/MapClickInfo';
import MiniSidebar from '../components/Timeline/MiniSidebar';

const UI = () => (
  <div className='content'>
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
      render={() => <MiniSidebar />}
    />
    <Flag
      name="UI.MapClickInfo"
      render={() => <MapClickInfo />}
    />
    <Flag
      name="UI.MapControls"
      render={() => <MapControls />}
    />
    <Flag
      name="UI.MapViewport"
      render={() => <MapViewport />}
    />
  </div>
);

export default UI;
