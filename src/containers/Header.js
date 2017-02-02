import React from 'react';
import ControlButtonsController from './ControlButtonsController';
import SetYearFieldContainer from './SetYearFieldContainer';

import ApiButton from './ApiButton';

const Header = () => (
  <div className='header'>
    <span>
      Map (Thanks, Captain)
      <ApiButton />
      <ControlButtonsController />
      <SetYearFieldContainer />
    </span>
  </div>
);
export default Header;
