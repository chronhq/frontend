import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTick } from '../../reducers/actions';
import './Timeline.less';
import { Next, Previous, NavigationPan } from './TimelineControls';


const Event = ({ event, selectCb, selectedId }) => {
  const eventClasses = ['timeline__entry'];
  if (selectedId === event.tick) { eventClasses.push('timeline__entry--selected'); }

  return (
    <div>
      <div
        role="button"
        key={`event_${event.id}`}
        onClick={() => selectCb(event.tick, event.id)}
        className={eventClasses.join(' ')}
      >
        <div className="timeline__heading"> {event.year} </div>
        <div className='timeline__title'> {event.title} </div>
        <div className='timeline__text'> {event.description} </div>
      </div>
    </div>
  );
};

class Timeline extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    timeline: PropTypes.object.isRequired,
    tick: PropTypes.number.isRequired,
    ticks: PropTypes.object.isRequired
  }

  state = {
    isMinified: false,
    isBioOn: false,
  }

  componentDidUpdate() {
    const selectedNode = document.getElementsByClassName('timeline__entry--selected');
    const containerNode = document.getElementsByClassName('event__container');
    containerNode[0].scrollTop = selectedNode[0].offsetTop-222; // HARDCODE
  }

  handleSelect = (tick) => {
    this.props.changeTick(tick);
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

  toggleBio() {
    console.log('toggleBio event');
    this.setState({ isBioOn: !this.state.isBioOn });
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
        <NavigationPan
          isMin={this.state.isMinified}
          cb={() => this.toggleSidebar()}
          cbbio={() => this.toggleBio()}
        />
        <Next />
        <div className='event__container'>
          {Object.keys(this.props.timeline).map(event => (
            event !== null && <Event
              key={`events_${event}`}
              event={this.props.timeline[event]}
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
  return {
    timeline: state.courses.timeline.tick,
    tick: state.timeline.year.tick,
    ticks: state.courses.timeline.tick
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeTick: bindActionCreators(changeTick, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
