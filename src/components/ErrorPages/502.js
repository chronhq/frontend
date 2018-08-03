import React from 'react';

import TitleLogo from './TitleLogo';
import './ErrorPages.less';

import egyptImg from './egypt.svg';
import japanImg from './japan.svg';


const BadGateway = () => (
  <div className='errorPage' id='NotFound'>
    <TitleLogo />
    <h2 className='text-center'>
      { '502... Bad Gateway ' }
    </h2>
    <div className='background'>
      <img className='over' src={japanImg} alt='japanese-warrior' />
      <img className='under' src={egyptImg} alt='egyptian-warrior' />
    </div>
  </div>
);

export default BadGateway;
