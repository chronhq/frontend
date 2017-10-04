import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTick } from '../../reducers/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Timeline.less';
// import './Timeline-Derpicated.less';
import { Next, Previous, NavigationPan } from './TimelineControls';


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
        <div className="timeline__heading"> {event.year} </div>
        <div className='timeline__title'> {event.title} </div>
        <div className='timeline__text'> {event.description} </div>
        {/*  
          <h4 className='event__date'>{event.year}</h4> 
        <div className='timeline__id'>{event.year}</div>
         */}
      </div>
    </div>
  );
};

class Timeline extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    timeline: PropTypes.array.isRequired,
    tick: PropTypes.number.isRequired,
    ticks: PropTypes.object.isRequired
  }

  state = {
    isMinified: false
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

  toggleSidebar() {
    this.setState({ isMinified: !this.state.isMinified });
  }

  render() {
    const timelineClasses = ['timeline'];
    if (this.state.isMinified) { timelineClasses.push('timeline__minified'); }

    return (
      <div
        className={timelineClasses.join(' ')}
        id="keyboard"
        role="button"
        tabIndex='0'
        onWheel={e => this.handleWheel(e)}
        onKeyDown={e => this.handlePress(e)}
      >
        <NavigationPan isMin={this.state.isMinified} cb={() => this.toggleSidebar()} />
        <Next />
        <div className='event__container'>
          {this.props.timeline.map(event => (
            event !== null && <Event
              key={`events_${event.tick}`}
              event={event}
              selectCb={(tick, ev) => this.handleSelect(tick, ev)}
              selectedId={this.props.tick}
            />)
          )}
        </div>
        <Previous />
      </div>
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
