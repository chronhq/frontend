import React from 'react';
import { inject, observer } from 'mobx-react';

import ScaleWidget from './ScaleWidget';
import LoadingWidget from './LoadingWidget';
import FreePinsWidget from './FreePinsWidget';

@inject('store')
@observer
export default class Widgets extends React.Component {
  render() {
    return (
      <g transform={this.props.store.view.widgetTransform}>
        <ScaleWidget view={this.props.store.view} />
        <LoadingWidget borders={this.props.store.borders} />
        <FreePinsWidget />
      </g>
    );
  }
}
