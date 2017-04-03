import React, { PropTypes } from 'react';


const ControlButtons = ({ resetYear, togglePlay, timeline, nextYear, prevYear }) => (
  <span className='playButton center'>
    <button onClick={resetYear}><i className='fa fa-undo' aria-hidden='true' title='Restart' /></button>
    <button onClick={prevYear}><i className='fa fa-step-backward' aria-hidden='true' title='Previous Year' /></button>
    <button onClick={togglePlay} >
      {timeline.intervalId !== 0 ? <i className='fa fa-pause' aria-hidden='true' title='Pause' /> : <i className='fa fa-play' aria-hidden='true' title='Play' />}
    </button>
    <button onClick={nextYear}><i className='fa fa-step-forward' aria-hidden='true' title='Next Year' /></button>
    {/* {' '}{timeline.now} */}
  </span>
);

ControlButtons.propTypes = {
  resetYear: PropTypes.func.isRequired,
  nextYear: PropTypes.func.isRequired,
  prevYear: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  timeline: PropTypes.object.isRequired,
};
export default ControlButtons;
