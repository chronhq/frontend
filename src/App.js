import React from 'react';

import MapD3Container from './containers/MapD3Container';
import Legend from './containers/Legend';
import Header from './containers/Header';
import SidePanel from './components/SidePanel';

import DevTools from './DevTools';

const App = () => (
  <div>
    <SidePanel />
    <div className='content'>
      <MapD3Container />
    </div>
    <DevTools />
  </div>
);

export default App;
