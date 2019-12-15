import React from 'react';
import PropTypes from 'prop-types';
import './Button.less';

export const BUTTON_TYPE = {
  BASIC: 'basic',
  GHOST: 'ghost',
  READMORE: 'readmore',
  CLOSE: 'close',
  COMPACT: 'close compact',
  TRUNCATE: 'truncate',
  ICON: 'icon'
};

export const BUTTON_SIZE = {
  NORMAL: 'normal',
  SMALL: 'small',
  WIDE: 'wide',
  AUTO: 'auto',
  HUGE: 'huge',
};

export const BUTTON_COLOR = {
  DEFAULT: '',
  RED: 'red',
  VK: 'vk',
  BLACK: 'black',
  LIGHT: 'light',
  TRANSP: 'transparent'
};

const Button = ({
  btnSize,
  btnType,
  btnColor,
  children,
  enabled,
  // type,
  ...props
}) => (
  <button
    type='button'
    {...props}
    className={`${btnSize} ${btnType} ${btnColor} ${enabled ? '' : 'disabled'}`}
  >
    {children}
  </button>
);

Button.defaultProps = {
  btnSize: BUTTON_SIZE.NORMAL,
  btnType: BUTTON_TYPE.BASIC,
  btnColor: BUTTON_COLOR.DEFAULT,
  enabled: true,
  children: '',
  type: 'button'
};

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  enabled: PropTypes.bool,
  btnType: PropTypes.string,
  btnColor: PropTypes.string,
  btnSize: PropTypes.string
};

export default Button;
