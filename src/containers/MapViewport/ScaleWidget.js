import React from 'react';
import { observer } from 'mobx-react';

const kmPerPx = 32;

const ScaleWidget = ({ view }) => (
  <g className='sizeMeter' strokeWidth="1" stroke='black' >
    <line x1="0" y1="0" x2="100" y2="0" />
    <line x1="0" y1="0" x2="0" y2="-5" />
    <line x1="100" y1="0" x2="100" y2="-5" />
    <text transform="translate(20, -5)" stroke='transparent' >
      {Math.round(((1 / view.preciseScale) * kmPerPx) * 100)} Км
    </text>
  </g>
);
export default observer(ScaleWidget);
