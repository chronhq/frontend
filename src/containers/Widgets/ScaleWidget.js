import React from 'react';
import { observer, inject } from 'mobx-react';


@inject('store')
@observer
export default class ScaleWidget extends React.Component {
  render() {
    const scale = this.props.store.view.scaleWidget;
    return (
      <g className='sizeMeter' strokeWidth="1" stroke='black'>
        <line x1="0" y1="0" x2="100" y2="0" />
        <line x1="0" y1="0" x2="0" y2="-5" />
        <line x1="100" y1="0" x2="100" y2="-5" />
        <text transform="translate(20, -5)" stroke='transparent'>
          {scale.value}
          {' '}
          {scale.units}
        </text>
      </g>
    );
  }
}
