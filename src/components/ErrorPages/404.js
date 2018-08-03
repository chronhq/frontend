import React from 'react';

import TitleLogo from './TitleLogo';
import './ErrorPages.less';

import image from './majortom.svg';

const NotFound = () => (
  <div className='errorPage' id='NotFound'>
    <TitleLogo />
    <h2>
      {' 404... Страница не найдена '}
    </h2>
    <h3>
      {' Page not found '}
    </h3>
    <div className='background'>
      <img className='background__single' src={image} alt='astronout' />
    </div>
  </div>
);

export default NotFound;
