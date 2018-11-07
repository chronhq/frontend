import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logoRu from '../../img/logo-grey-ru.svg';
import logoEn from '../../img/logo-grey-en.svg';

const TitleLogo = ({ lng }) => {
  const logo = (lng === 'ru') ? logoRu : logoEn;
  return (
    <Link to='/' className='errorPage__logo'>
      <img
        src={logo}
        alt='logo'
      />
    </Link>
  );
};

TitleLogo.propTypes = {
  lng: PropTypes.string.isRequired
};

export default TitleLogo;
