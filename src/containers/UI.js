import React from 'react';
import Flag from '../Flag';

import MapViewport from '../containers/MapViewport';
import SidePanel from '../components/SidePanel';
import TimePanel from '../components/TimePanel';
import MapControls from '../components/MapControls';
import MiniSidebar from '../components/Timeline/MiniSidebar';
import LegendHOC from '../containers/LegendHOC';
import Bio from '../components/Timeline/Bio';

const UI = () => (
  <div className='content'>
    <Flag
      name="UI.SidePanel-NotImplemented"
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
      name="UI.LegendHOC-NotImplemented"
      render={() => <LegendHOC />}
    />
    <Flag
      name="UI.Bio-NotImplemented"
      render={() => <Bio />}
    />
  </div>
);

export default UI;
