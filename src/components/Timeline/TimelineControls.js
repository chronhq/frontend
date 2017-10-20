import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import 'MiniSidebar.less';
import './TimelineControls.less';
import { changeTick } from '../../reducers/actions';
import TimelineButtons from './TimelineButtons';

function changeUI(data) {
  return {
    type: 'CHANGE_UI',
    data
  };
}

const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);


class NextComponent extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    tick: PropTypes.number.isRequired,
    ticks: PropTypes.object.isRequired
  }

  handlePrevious() {
    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    this.props.ticks[this.props.tick - 1] &&
    this.props.changeTick(this.props.tick - 1);
  }

  render() {
    return (
      <div className='timeline__control control__up'>
        <OverlayTrigger placement='left' delayHide={0} overlay={tooltip('Предыдущий год')} >
          <button onClick={() => this.handlePrevious()}>
            <i className='fa fa-angle-up fa-fw' />
            <hr />
          </button>
        </OverlayTrigger>
      </div>
    );
  }
}

class PreviousComponent extends React.Component {
  static propTypes = {
    changeTick: PropTypes.func.isRequired,
    tick: PropTypes.number.isRequired,
    ticks: PropTypes.object.isRequired
  }

  handleNext() {
    /* eslint no-unused-expressions: ["error", { "allowShortCircuit": true }] */
    this.props.ticks[this.props.tick + 1] &&
    this.props.changeTick(this.props.tick + 1);
  }

  render() {
    return (
      <div className='timeline__control control__down'>
        <OverlayTrigger placement='left' delayHide={200} overlay={tooltip('Следущий год')} >
          <button onClick={() => this.handleNext()}>
            <hr />
            <i className='fa fa-angle-down fa-fw' />
          </button>
        </OverlayTrigger>
      </div>
    );
  }
}

export const NavigationPan = ({ cb, isMin, cbbio }) => (
  <div className='timeline__control control__home'>
    <OverlayTrigger placement='bottom' delayHide={200} overlay={tooltip((isMin) ? 'Развернуть' : 'Свернуть')} >
      <button onClick={() => cb()}>
        <i className='fa fa-bars fa-fw' />
      </button>
    </OverlayTrigger>
    {(isMin) ? null : <TimelineButtons cb={cbbio} />}
  </div>
);


function mapStateToProps(state) {
  return {
    tick: state.timeline.year.tick,
    ticks: state.courses.timeline.tick
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUI: bindActionCreators(changeUI, dispatch),
    changeTick: bindActionCreators(changeTick, dispatch)
  };
}

export const Next = connect(
  mapStateToProps,
  mapDispatchToProps
)(NextComponent);

export const Previous = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviousComponent);
