import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TitleLogo = ({ logo }) => (
  <Link to='/' className='error-page__logo'>
    <img
      src={logo}
      alt='logo'
    />
  </Link>
);

TitleLogo.propTypes = {
  logo: PropTypes.string.isRequired
};

export default TitleLogo;
