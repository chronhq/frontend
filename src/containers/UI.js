import React from 'react';
import Flag from '../Flag';

import MapViewport from './GeoLayers';
import Timeline from '../components/Timeline';

import TimePanel from '../templates/TimePanel/TimePanel';
import SidePanel from '../templates/SidePanel/SidePanel';
import Overlays from '../templates/Overlays/Overlays';

import Bio from '../components/Timeline/Bio';
import Widgets from './Widgets';
import Balloon from './Balloon';
import FontLoader from './FontLoader';


/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
const MapPicsDownloadLink = () => (process.env.NODE_ENV === 'production'
  ? ''
  : (<a href='' visibility='hidden' id='mapPicsDownloadLink' />));
/* eslint-enable jsx-a11y/anchor-has-content */
/* eslint-enable jsx-a11y/anchor-is-valid */


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
    <MapPicsDownloadLink />
  </div>
);

export default UI;
