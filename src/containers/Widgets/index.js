import React from 'react';
import { inject, observer } from 'mobx-react';

// import ScaleWidget from './ScaleWidget';
// import LoadingWidget from './LoadingWidget';
import FreePinsWidget from './FreePinsWidget';
import Defs from './Defs';

@inject('store')
@observer
export default class Widgets extends React.Component {
  render() {
    const freePinsEnabled = !this.props.store.projection.clipEnabled;
    return (
      <svg
        width={this.props.store.view.width}
        height={this.props.store.view.height}
        style={{ zIndex: 2, pointerEvents: 'none', position: 'absolute' }}
      >
        <Defs />
        <g id='svgWidgets'>
          {/* <ScaleWidget /> */}
          {/* <LoadingWidget /> */}
          {freePinsEnabled && <FreePinsWidget /> }
        </g>
      </svg>
    );
  }
}
