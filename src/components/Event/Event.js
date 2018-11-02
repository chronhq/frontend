import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

@inject('store')
@observer
class Event extends React.Component {
  @computed get event() {
    return this.props.store.data.CourseTimelines.data[this.props.eventId];
  }

  @computed get tick() {
    return this.props.store.year.tick;
  }

  @computed get className() {
    return this.tick === this.event.tick
      ? ['timeline__entry', 'timeline__entry--selected'].join(' ')
      : ['timeline__entry'].join(' ');
  }

  render() {
    return (
      <div>
        <div
          role="button"
          key={`event_${this.event.id}`}
          onClick={() => this.props.store.year.setTick(this.event.tick)}
          className={this.className}
        >
          <div className="timeline__heading">
            {' '}
            {this.event.year}
            {' '}
          </div>
          <div className='timeline__title'>
            {' '}
            {this.event.title}
            {' '}
          </div>
          <div className='timeline__text'>
            {' '}
            {this.event.description}
            {' '}
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
