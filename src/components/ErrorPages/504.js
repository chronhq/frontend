import React from 'react';

import TitleLogo from './TitleLogo';
import './ErrorPages.less';

import egyptImg from './egypt.svg';
import japanImg from './japan.svg';

const GatewayTimeout = () => (
  <div className='errorPage' id='NotFound'>
    <TitleLogo />
    <h2>
      { '504... Gateway Timeout ' }
    </h2>
    <div className='background'>
      <img className='over' src={japanImg} alt='japanese-warrior' />
      <img className='under' src={egyptImg} alt='egyptian-warrior' />
    </div>
  </div>
);

export default GatewayTimeout;
