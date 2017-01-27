import React from 'react';
import ControlButtonsController from './ControlButtonsController';
import SetYearFieldContainer from './SetYearFieldContainer';

const Header = () => (
  <div className='header'>
    <span>
      Map (Thanks, Captain)
      <ControlButtonsController />
      <SetYearFieldContainer />
    </span>
  </div>
);
export default Header;
