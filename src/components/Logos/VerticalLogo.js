import React from 'react';
import PropTypes from 'prop-types';

const VerticalLogo = ({ logo }) => (
  <div className='vertical--logo'>
    <img src={logo} alt='logo' />
  </div>
);

VerticalLogo.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default VerticalLogo;
