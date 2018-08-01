import React from 'react';
import { inject, observer } from 'mobx-react';

import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import FreePinsWidget from './FreePinsWidget';
import Defs from './Defs';

@inject('store')
@observer
export default class Widgets extends React.Component {
  render() {
    const freePinsEnabled = !this.props.store.projection.clipEnabled;
    const showWidgets = this.props.store.deck.innerWidth > 600;
    const shiftHeight = this.props.store.deck.innerHeight - 100;
    const shiftX = 50;
    const translate = `translate(${shiftX}, ${shiftHeight})`;
    return (
      <svg
        width={this.props.store.deck.innerWidth}
        height={this.props.store.deck.innerHeight}
        style={{ zIndex: 2, pointerEvents: 'none', position: 'absolute' }}
      >
        <Defs />
        <g id='svgWidgets' transform={translate}>
          {showWidgets && <ScaleWidget />}
          {showWidgets && <LoadingWidget />}
          {freePinsEnabled && <FreePinsWidget /> }
        </g>
      </svg>
    );
  }
}
