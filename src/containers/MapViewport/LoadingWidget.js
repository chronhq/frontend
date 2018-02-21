import React from 'react';
import { observer } from 'mobx-react';


const LoadingWidget = ({ borders }) => (
  <g className='sizeMeter' transform='translate(0,-40)' strokeWidth="1" stroke='black' >
    <text stroke='transparent' >{(borders.ready) ? 'Карты загружены' : 'Загружаем карты'}</text>
  </g>
);
export default observer(LoadingWidget);
