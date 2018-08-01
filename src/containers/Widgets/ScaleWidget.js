import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';


@inject('store')
@observer
export default class ScaleWidget extends React.Component {
  @observable milesInKm = 0.621371;

  @computed get scaleRaw() {
    const earth = 40075; // in km
    const pixels = (1024 * this.props.store.deck.zoom);
    const pxPerKm = earth / pixels;
    return pxPerKm;
  }

  @computed get scaleWidget() {
    switch (this.props.store.i18n.lng) {
      case 'ru':
        return {
          value: Math.round(this.scaleRaw * 100),
          units: 'Km'
        };
      default:
        return {
          value: Math.round(this.scaleRaw * this.milesInKm * 100),
          units: 'Miles'
        };
    }
  }

  render() {
    const scale = this.scaleWidget;
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
