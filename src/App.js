import React from 'react';

import MapD3Container from './containers/MapD3Container';
import Legend from './containers/Legend';
import Header from './containers/Header';
import UI from './components/UI';

import DevTools from './DevTools';

const App = () => (
  <div>
    <Header />
    <div className='content'>
      <MapD3Container />
      <Legend />
      {process.env.FEATURES.includes('UI') && <UI />}
    </div>
    <DevTools />
  </div>
);

export default App;
