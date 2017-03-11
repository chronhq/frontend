import React, { PropTypes } from 'react';
import './ControlButtons.less';

const ControlButtons = ({ resetYear, togglePlay, timeline, nextYear }) => (
  <span className='playButton center'>
    <button className='btn btn-default' onClick={resetYear}><i className='fa fa-undo fa-lg' aria-hidden='true' title='Restart' /></button>
    <button><i className='fa fa-step-backward fa-lg' aria-hidden='true' title='Previous Year' /></button>
    <button onClick={togglePlay} >
      {timeline.intervalId !== 0 ? <i className='fa fa-pause fa-lg' aria-hidden='true' title='Pause' /> : <i className='fa fa-play fa-lg' aria-hidden='true' title='Play' />}
    </button>
    <button onClick={nextYear}><i className='fa fa-step-forward fa-lg' aria-hidden='true' title='Next Year' /></button>
    {/* {' '}{timeline.now} */}
  </span>
);

ControlButtons.propTypes = {
  resetYear: PropTypes.func.isRequired,
  nextYear: PropTypes.func.isRequired,
  //prevYear: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  timeline: PropTypes.object.isRequired,
};
export default ControlButtons;
