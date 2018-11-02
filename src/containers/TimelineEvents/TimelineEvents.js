import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Event from '../../components/Event/Event';
import './TimelineEvents.less';

@inject('store')
@observer
class TimelineEvents extends React.Component {
  @computed get timeline() {
    return this.props.store.data.CourseTimelines.data;
  }

  handleWheel(event) {
    if (event.deltaY > 1) {
      this.props.store.year.nextTick();
    } else if (event.deltaY < -1) {
      this.props.store.year.prevTick();
    }
  }

  render() {
    return (
      <div
        className='event__container'
        onWheel={e => this.handleWheel(e)}
      >
        {Object.keys(this.timeline).map(event => (
          event !== null && (
            <Event
              key={`events_${event}`}
              eventId={event}
            />
          )))}
      </div>
    );
  }
}

export default TimelineEvents;
