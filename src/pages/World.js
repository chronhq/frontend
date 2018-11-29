import React from 'react';

import TimePanel from '../templates/TimePanel/TimePanel';
import SidePanel from '../templates/SidePanel/SidePanel';
import Overlays from '../templates/Overlays/Overlays';
import Widgets from '../containers/Widgets';
import Balloon from '../containers/Balloon';
import FontLoader from '../containers/FontLoader';
import GeoLayers from '../containers/GeoLayers';
import Wrapper from './Wrapper';

const World = ({ match }) => (
  <Wrapper match={match} className='content'>
    <Widgets />
    <FontLoader />
    <Overlays />
    <SidePanel />
    <TimePanel />
    <Balloon />
    <GeoLayers />
  </Wrapper>
);

export default World;
