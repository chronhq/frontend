import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextYear, prevYear, resetYear } from '../reducers/timeline';
import { startPlaying, stopPlaying } from '../reducers/status';


class ControlButtons extends Component {
  static propTypes = {
    resetYear: PropTypes.func.isRequired,
    nextYear: PropTypes.func.isRequired,
    prevYear: PropTypes.func.isRequired,
    startPlaying: PropTypes.func.isRequired,
    stopPlaying: PropTypes.func.isRequired,
    playing: PropTypes.bool.isRequired
  }

  render() {
    return (
      <span className='playButton center'>
        <button onClick={this.props.resetYear}>
          <i className='fa fa-undo' aria-hidden='true' title='Restart' />
        </button>
        <button onClick={this.props.prevYear}>
          <i className='fa fa-step-backward' aria-hidden='true' title='Previous Year' />
        </button>
        {this.props.playing
          ? <button onClick={this.props.stopPlaying} >
            <i className='fa fa-pause' aria-hidden='true' title='Pause' />
          </button>
          : <button onClick={this.props.startPlaying} >
            <i className='fa fa-play' aria-hidden='true' title='Play' />
          </button>
        }
        <button onClick={this.props.nextYear}><i className='fa fa-step-forward' aria-hidden='true' title='Next Year' /></button>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return { playing: state.status.playing };
}

function mapDispatchToProps(dispatch) {
  return {
    nextYear: bindActionCreators(nextYear, dispatch),
    prevYear: bindActionCreators(prevYear, dispatch),
    resetYear: bindActionCreators(resetYear, dispatch),
    startPlaying: bindActionCreators(startPlaying, dispatch),
    stopPlaying: bindActionCreators(stopPlaying, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);
