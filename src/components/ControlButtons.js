import React from 'react';

const ControlButtons = ({ resetYear, togglePlay, timeline }) => (
  <span className='playButton'>
    <button onClick={resetYear}>Restart</button>
    <button
      onClick={togglePlay}
    >
      {timeline.intervalId !== 0 ? 'Pause' : 'Play'}
    </button>
    {' '}{timeline.now}
  </span>
);

export default ControlButtons;
