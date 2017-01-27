import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as timelineActions from '../reducers/timeline';
import ControlButtons from '../components/ControlButtons';

class ControlButtonsController extends PureComponent {
  togglePlay = () => {
    if (this.props.timeline.intervalId) {
      clearInterval(this.props.timeline.intervalId);
      this.props.timelineAction.saveIntervalId(0);
    } else {
      this.props.timelineAction.saveIntervalId(setInterval(this.props.timelineAction.nextYear,
         this.props.timeline.interval));
    }
  }

  render() {
    return (<ControlButtons
      timeline={this.props.timeline}
      reestYear={this.props.timelineAction.resetYear}
      togglePlay={this.togglePlay}
    />
    );
  }
}
ControlButtonsController.propTypes = {
  timeline: PropTypes.object.isRequired,
  timelineAction: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { timeline: {
    now: state.timeline.now,
    interval: state.timeline.interval,
    intervalId: state.timeline.intervalId
  }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    timelineAction: bindActionCreators(timelineActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ControlButtonsController);
