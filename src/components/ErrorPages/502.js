import React from 'react';
import { Link } from 'react-router-dom';
if (process.env.WEBPACK) require('./ErrorPages.less'); // eslint-disable-line global-require
import image from './egypt.svg';
import image_2 from './japan.svg';
import logo from '../../img/logo.png';

const BadGateway  = () => (
  <div className='errorPage' id='NotFound'>
    <Link to='/'>
    <div className='errorPage__title'>
      <img src={logo} />
      <h1>  Хронист </h1>
      </div>
    </Link>
      <h3 className='text-center'>504... Bad Gateway </h3>
    <div className='background'>
      <img className='over' src={image_2} />
      <img className='under' src={image} />
    </div>
  </div>
);

export default BadGateway;
