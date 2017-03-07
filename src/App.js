import React from 'react';

import MapD3Container from './containers/MapD3Container';
import SidePanel from './components/SidePanel';
import TimePanel from './components/TimePanel';

import DevTools from './DevTools';

const App = () => (
  <div>
    <SidePanel />
    <TimePanel />
    <div className='content'>
      <MapD3Container />
    </div>
    <DevTools />
  </div>
);

export default App;
