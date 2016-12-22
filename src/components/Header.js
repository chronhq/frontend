import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as timelineActions from '../reducers/timeline';

function togglePlay(){
  if(this.timeline.intervalId){
    clearInterval(this.timeline.intervalId);
    this.timelineAction.saveIntervalId(0);
  }else{
    this.timelineAction.saveIntervalId(setInterval(this.timelineAction.nextYear, this.timeline.interval));
  }
}

const Header = ({timeline, timelineAction}) => (
  <div className='header'>
    <span>
      Map (Thanks, Captain)
    </span>
    <span className='playButton'>
      <button onClick={timelineAction.resetYear}>Restart</button>
      <button
        onClick={togglePlay.bind({timeline,timelineAction})}>
        {timeline.intervalId != 0 ? 'Pause' : 'Play'}
      </button>
      {' '}{timeline.now}
    </span>
  </div>
)
function mapStateToProps (state) {
  return {timeline: state.timeline}
}
function mapDispatchToProps(dispatch) {
  return {
    timelineAction: bindActionCreators(timelineActions, dispatch),
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)
