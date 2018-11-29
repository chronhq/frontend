import React from 'react';

import Overlays from '../templates/Overlays/Overlays';
import Timeline from '../templates/Timeline/Timeline';
import GeoLayers from '../containers/GeoLayers';
import Bio from '../components/TimelineBio/Bio';
import Widgets from '../containers/Widgets';
import Balloon from '../containers/Balloon';
import FontLoader from '../containers/FontLoader';
import Wrapper from './Wrapper';

const Narrative = ({ match }) => (
  <Wrapper match={match} className='content'>
    <Widgets />
    <FontLoader />
    <Overlays />
    <Bio />
    <GeoLayers />
    <Timeline />
    <Balloon />
  </Wrapper>
);

export default Narrative;
