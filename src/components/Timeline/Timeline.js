import React from 'react';
import { connect } from 'react-redux';

import './Timeline.less';

const Event = ({ timeline, events }) => (
  <div className={false ? 'timeline__entry timeline__entry--selected' : 'timeline__entry'}>
    {events && events.map(event =>
      <div key={`event_${event.id}`}>
        <div className="timeline__heading">
          <h4 className='event__name'> {event.title} </h4>
          <h4 className='event__date'> {timeline.year} </h4>
        </div>
        <div className="timeline__text">
          <p>{event.description}</p>
        </div>
      </div>
    )}
  </div>
);


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
    };
  }

  selectEvent(e) {
    e.preventDefault();
    this.setState({ isSelect: !this.state.isSelect });
  }

  render() {
    return (
      <div className='timeline'>
        {Object.keys(this.props.timeline).map(tickid =>
          <Event
            key={`events_${tickid}`}
            timeline={this.props.timeline[tickid]}
            events={this.props.events[tickid]}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeline: state.courses.timeline.tick,
    events: state.courses.events.tick
  };
}

export default connect(mapStateToProps)(Timeline);
