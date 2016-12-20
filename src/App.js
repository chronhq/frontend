import React, { Component } from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import areas from './data/svg';
import tech from './data/tech';

export default class App extends Component {
  play(){
    if(this.state.year < this.state.maxYear){
      this.setState({year: this.state.year + 1});
    }
  }
  togglePlay() {
    if(this.state.intervalId){
      clearInterval(this.state.intervalId);
      this.setState({intervalId:0});
    }else{
      this.setState({intervalId: setInterval(this.play, this.state.interval)});
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      interval: 500,
      year: 1750,
      maxYear: 2000
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.play = this.play.bind(this);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <span>
            Map (Thanks, Captain)
          </span>
          <span className='playButton'>
            <button onClick={this.togglePlay}>Play/Pause</button>{' '}{this.state.year}
          </span>
        </div>

        <div className='content'>
          <Map areas={areas} />
          <Legend facts={tech} currentYear={this.state.year} />
        </div>
      </div>
    )
  }
}
