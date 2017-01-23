import React from 'react';

import Map from './containers/Map';
import Legend from './containers/Legend';
import Header from './containers/Header';

import DevTools from './DevTools';


const App = () => (
  <div>
    <Header />
    <div className='content'>
      <Map />
      <Legend />
    </div>
    <DevTools />
  </div>
);

export default App;
