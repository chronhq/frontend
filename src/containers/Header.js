import React from 'react';
import ControlButtonsController from './ControlButtonsController';
import SetYearFieldContainer from './SetYearFieldContainer';
import SetProjectionContainer from './SetProjectionContainer';
import SetLayerVisibility from './SetLayerVisibility';

// import ApiButton from './ApiButton';

const Header = () => (
  <div className='header'>
    <span>
      <ControlButtonsController />
      <SetYearFieldContainer />
      <SetProjectionContainer />
      <SetLayerVisibility />
    </span>
  </div>
);
export default Header;
