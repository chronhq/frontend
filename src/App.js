import React from 'react';

import Map from './components/Map';
import Legend from './components/Legend';
import Header from './components/Header';


const App = () => (
  <div>
    <Header />
    <div className='content'>
      <Map />
      <Legend />
    </div>
  </div>
);

export default App;
