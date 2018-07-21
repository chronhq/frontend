import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.less';
import image from './majortom.svg';
import logo from '../../img/logo.png';

const NotFound = () => (
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
      { '404... Страница не найдена' }
    </h3>
    <div className='background'>
      <img className='background__single' src={image} />
    </div>
  </div>
);

export default NotFound;
