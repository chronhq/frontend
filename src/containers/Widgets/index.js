import React from 'react';
import { inject, observer } from 'mobx-react';

import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import FreePinsWidget from './FreePinsWidget';
import Defs from './Defs';

@inject('store')
@observer
class Widgets extends React.Component {
  render() {
    const freePinsEnabled = !this.props.store.projection.clipEnabled;
    const showWidgets = this.props.store.deck.width > 600;
    const shiftHeight = this.props.store.deck.height - 100;
    const shiftX = 50;
    const translate = `translate(${shiftX}, ${shiftHeight})`;
    return (
      <svg
        width={this.props.store.deck.width}
        height={this.props.store.deck.height}
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

export default Widgets;
