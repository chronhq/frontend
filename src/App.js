import React, { Component } from 'react';
import Map from './components/Map';
import Legend from './components/Legend';
import areas from './data/svg';
import tech from './data/tech';
let facts = tech;
let startYear = 1750;
export default class App extends Component {
  componentWillUpdate(nextProps, nextState){
    facts = tech.map(function(fact) {
      fact.completed = nextState.year > fact.year ? true : false;
      return fact;
    });
  }
  play(){
    if(this.state.year < this.state.maxYear){
      this.setState({year: this.state.year + 1});
    }else{
      this.restart();
    }
  }
  restart(){
    this.setState({year: startYear});
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
      year: startYear,
      maxYear: 2000
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.play = this.play.bind(this);
    this.restart = this.restart.bind(this);
  }

  render() {
    let playButton = this.state.intervalId != 0 ? 'Pause' : 'Play';
    return (
      <div>
        <div className='header'>
          <span>
            Map (Thanks, Captain)
          </span>
          <span className='playButton'>
            <button onClick={this.restart}>Restart</button>
            <button onClick={this.togglePlay}>{playButton}</button>
            {' '}{this.state.year}
          </span>
        </div>

        <div className='content'>
          <Map areas={areas} facts={facts} />
          <Legend facts={facts} />
        </div>
      </div>
    )
  }
}
