import React from 'react';

import MapD3Container from './containers/MapD3Container';
import Legend from './containers/Legend';
import Header from './containers/Header';

import DevTools from './DevTools';
import UI from '/components/UI'


const App = () => (
  <div>
    <Header />
    <div className='content'>
      <MapD3Container />
      <Legend />
      <UI />
    </div>
    <DevTools />
  </div>
);

export default App;
