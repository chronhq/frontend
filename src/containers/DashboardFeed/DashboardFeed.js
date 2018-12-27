import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import NarrativeEvent from '../../components/NarrativeEvent/NarrativeEvent';
import './DashboardFeed.less';

@inject('store')
@observer
class DashboardFeed extends React.Component {
  @computed get timeline() {
    return this.props.store.data.CourseTimelines.data;
  }

  @computed get tick() {
    return this.props.store.year.tick;
  }

  handleWheel = (event) => {
    if (event.deltaY > 1) {
      this.props.store.year.nextTick();
    } else if (event.deltaY < -1) {
      this.props.store.year.prevTick();
    }
  }

  render() {
    return (
      <div className='dashboard-content'>
        <h2>
          {Object.keys(this.timeline).map(event => (
            event !== null && (
              <NarrativeEvent
                key={`events_${event}`}
                event={this.timeline[event]}
                cb={v => this.props.store.year.setTick(v)} // event.tick in value
                currentTick={this.tick}
              />
            )
          ))}
        </h2>
      </div>
    );
  }
}

export default DashboardFeed;
