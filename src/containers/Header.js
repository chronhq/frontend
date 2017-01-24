import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timelineActions from '../reducers/timeline';
import ControlButtons from '../components/ControlButtons';

function togglePlay() {
  if (this.timeline.intervalId) {
    clearInterval(this.timeline.intervalId);
    this.timelineAction.saveIntervalId(0);
  } else {
    this.timelineAction.saveIntervalId(setInterval(this.timelineAction.nextYear,
       this.timeline.interval));
  }
}

const Header = ({ timeline, timelineAction }) => (
  <div className='header'>
    <span>
      Map (Thanks, Captain)
    </span>
    <ControlButtons
      timeline={timeline}
      reestYear={timelineAction.resetYear}
      togglePlay={togglePlay.bind({ timeline, timelineAction })}
    />
  </div>
);
function mapStateToProps(state) {
  return { timeline: {
    now: state.timeline.now,
    limit: state.timeline.max - state.timeline.now,
    interval: state.timeline.interval,
    intervalId: state.timeline.intervalId
  }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    timelineAction: bindActionCreators(timelineActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
