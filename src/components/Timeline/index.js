import React from 'react';
import { inject, observer } from 'mobx-react';

import './Timeline.less';
import TimelineControls from './TimelineControls';
import TimelineEvents from './TimelineEvents';

@inject('store')
@observer
class Timeline extends React.Component {
  render() {
    return (
      <TimelineControls>
        <TimelineEvents />
      </TimelineControls>
    );
  }
}

export default Timeline;
