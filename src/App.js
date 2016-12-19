import React, { Component } from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import areas from './data/svg';
import tech from './data/tech';

export default class App extends Component {
  render() {
    return (
      <div>
        <span className='header'><h1>Map (Thanks, Captain)</h1></span>
        <div className='content'>
          <Map areas={areas} />
          <Legend facts={tech} />
        </div>
      </div>
    )
  }
}
