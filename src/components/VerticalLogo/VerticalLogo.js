import React from 'react';
import PropTypes from 'prop-types';

import logoRu from '../../img/name_logo.svg';
import logoEn from '../../img/name_logo_eng.svg';

const VerticalLogo = ({ lng }) => (
  <div className='vertical--logo'>
    <img src={(lng === 'ru') ? logoRu : logoEn} alt='logo' />
  </div>
);

VerticalLogo.propTypes = {
  lng: PropTypes.string.isRequired,
};

export default VerticalLogo;
