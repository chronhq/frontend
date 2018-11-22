import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LoadingWidget extends React.Component {
  render() {
    const message = this.props.store.deck.loadingStatus
      ? this.props.store.i18n.data.loadingWidget.loaded
      : this.props.store.i18n.data.loadingWidget.loading;
    return (
      <g className='sizeMeter' transform='translate(0,-40)' strokeWidth="1" stroke='black'>
        <text stroke='transparent'>
          {message}
        </text>
      </g>
    );
  }
}

export default LoadingWidget;
