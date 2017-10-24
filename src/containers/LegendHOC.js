import React from 'react';
import Legend from './Legend';
import MapClickInfo from '../components/MapClickInfo';

const LegendHOC = () => (
  <div className='course__legend'>
    <MapClickInfo />
    <Legend />
  </div>
);

export default LegendHOC;
