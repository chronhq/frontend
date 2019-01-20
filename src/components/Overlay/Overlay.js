import React from 'react';

import './Overlay.less';

export const overlayType = {
  BLACK: 'black',
  WHITE: 'white'
};

const Overlay = ({ type, children }) => (
  <div className={`overlay__${type}`}>
    {children}
  </div>
);

export default Overlay;
