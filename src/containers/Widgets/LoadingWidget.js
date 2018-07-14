import React from 'react';
import { observer, inject } from 'mobx-react';
@inject('store')
@observer
export default class LoadingWidget extends React.Component {
  render() {
    return (
      <g className='sizeMeter' transform='translate(0,-40)' strokeWidth="1" stroke='black' >
        <text stroke='transparent' >{this.props.store.borders.loadingStatus}</text>
      </g>
    );
  }
}

