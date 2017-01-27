import React from 'react';
import ControlButtonsController from './ControlButtonsController';

const Header = () => (
  <div className='header'>
    <span>
      Map (Thanks, Captain)
      <ControlButtonsController />
    </span>
  </div>
);
export default Header;
