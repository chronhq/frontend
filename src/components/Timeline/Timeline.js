import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTick } from '../../reducers/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Timeline.less';


const Event = ({ event, selectCb, selectedId }) => {
  const eventClasses = ['timeline__entry'];
  if (selectedId === event.tick) { eventClasses.push('timeline__entry--selected'); }

  return (
    <div>
      <div
        role="button"
        key={`event_${event.id}`}
        // onClick={() => selectCb(event.id)}
        onClick={() => selectCb(event.tick, event.id)}
        className={eventClasses.join(' ')}
      >
        <div className="timeline__heading">
          <h4 className='event__name'> {event.title} Tick: {event.tick} - Id: {event.id} </h4>
          <h4 className='event__date'> {event.year} </h4>
        </div>
        <div className='timeline__text'>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

class Timeline extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    timeline: PropTypes.array.isRequired,
    tick: PropTypes.number.isRequired,
    ticks: PropTypes.array.isRequired
  }


  handleSelect = (tick) => {
    // console.log(`tick is ${tick}`);
    // console.log(`event is ${event}`);
    // this.setState({ selectedId: event });
    this.props.changeTick(tick);
    // this.props.selectLocation(eventId);
  }

  handleWheel(event) {
    if (event.deltaY > 0) {
      this.handleNext();
    } else if (event.deltaY < 0) {
      this.handlePrevious();
    }
  }

  handlePress(event) {
    // console.log(e.keyCode);
    event.preventDefault();
    switch (event.keyCode) {
      case 38:
        this.handlePrevious();
        break;
      case 40:
        this.handleNext();
        break;
    }
  }

  handleNext() {
    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    // this.props.timeline[parseInt(this.props.tick, 10) + 1] &&
    // this.props.changeTick(parseInt(this.props.tick, 10) + 1);
    this.props.ticks[this.props.tick + 1] &&
    this.props.changeTick(this.props.tick + 1);
  }

  handlePrevious() {
    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    this.props.ticks[this.props.tick - 1] &&
    this.props.changeTick(this.props.tick - 1);
  }

  render() {
    return (
      <ReactCSSTransitionGroup>
        <div
          className='timeline'
          id="keyboard"
          role="button"
          tabIndex='0'
          onWheel={(e) => this.handleWheel(e)}
          onKeyDown={e => this.handlePress(e)}
        >
          {this.props.timeline.map(event => (
            event !== null && <Event
              key={`events_${event.tick}`}
              event={event}
              selectCb={(tick, ev) => this.handleSelect(tick, ev)}
              selectedId={this.props.tick}
            />)
          )}

        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

function mapStateToProps(state) {
  const tick = state.timeline.year.tick;
  const ticks = state.courses.timeline.tick;

  const timeline = [null, null, ticks[tick], null, null];
  const fillTimeline = (shift) => {
    const middle = 2;
    const curTick = tick + shift;
    if (curTick in ticks) {
      timeline[middle + shift] = ticks[curTick];
    }
  };
  [-2, -1, 1, 2].map(fillTimeline);
  console.log(timeline);
  return {
    timeline,
    tick,
    ticks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTick: bindActionCreators(changeTick, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
