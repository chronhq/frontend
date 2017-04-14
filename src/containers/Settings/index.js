import React from 'react';

import SetProjectionContainer from './SetProjectionContainer';
import SetLayerVisibility from './SetLayerVisibility';

const Settings = () => (
  <div className='projectionSettings'>
    <h3> Настройка проекции </h3>
    <SetProjectionContainer />
    <hr />
    <SetLayerVisibility />
  </div>
);

export default Settings;
