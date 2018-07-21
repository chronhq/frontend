import React from 'react';
import { Link } from 'react-router-dom'; // eslint-disable-line global-require
import egyptImg from './egypt.svg';
import japanImg from './japan.svg';
import logo from '../../img/logo.png';

if (process.env.WEBPACK) require('./ErrorPages.less');

const GatewayTimeout = () => (
  <div className='errorPage' id='NotFound'>
    <Link to='/'>
      <div className='errorPage__title'>
        <img src={logo} />
        <h1>
          { ' Хронист ' }
        </h1>
      </div>
    </Link>
    <h3 className='text-center'>
      { '504... Gateway Timeout ' }
    </h3>
    <div className='background'>
      <img className='over' src={japanImg} />
      <img className='under' src={egyptImg} />
    </div>
  </div>
);

export default GatewayTimeout;
