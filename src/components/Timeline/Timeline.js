import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTick } from '../../reducers/actions';
import './Timeline.less';


const Event = ({ tickid, timeline, events, selectCb, selectedId }) => (
  <div>
    {events && events.map(event =>
      <div
        key={`event_${event.id}`}
        // onClick={() => selectCb(event.id)}
        onClick={() => selectCb(tickid, event.id)}
        className={(selectedId == tickid) ? 'timeline__entry timeline__entry--selected' : 'timeline__entry'}
      >
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
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    timeline: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    tick: PropTypes.number.isRequired
  }


  handleSelect = (tick, event) => {
    console.log(`tick is ${tick}`);
    console.log(`event is ${event}`);
    this.setState({ selectedId: event });
    this.props.changeTick(parseInt(tick));
    // this.props.selectLocation(eventId);
  }

  render() {
    return (
      <div className='timeline'>
        {Object.keys(this.props.timeline).map(tickid =>
          <Event
            key={`events_${tickid}`}
            tickid={tickid}
            timeline={this.props.timeline[tickid]}
            events={this.props.events[tickid]}
            selectCb={(tick, event) => this.handleSelect(tick, event)}
            selectedId={this.props.tick}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeline: state.courses.timeline.tick,
    events: state.courses.events.tick,
    tick: state.timeline.year.tick
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTick: bindActionCreators(changeTick, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
