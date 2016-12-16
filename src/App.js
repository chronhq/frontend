import React, { Component } from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import areas from './data/svg';

export default class App extends Component {
  render() {
    return (
      <div>
        <span ><h1>Map (Thanks, Captain)</h1></span>
      <Map areas={areas} />
      <Legend />
      </div>
    )
  }
}
