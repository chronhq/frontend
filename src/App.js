import React from 'react';

import Map from './components/Map';
import Legend from './components/Legend';
import Header from './components/Header';

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
