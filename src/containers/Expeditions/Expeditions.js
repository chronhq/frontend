import React, { Component } from 'react';
import { connect } from 'react-redux';
import PathAnimation from './PathAnimation';

class Expeditions extends Component {
  render() {
    return (
      <g>
        {this.props.traces.map(trace =>
          <PathAnimation key={trace.id} points={trace.projected} />
        )}
      </g>);
  }
}

function mapStateToProps(state) {
  const tick = state.timeline.year.tick;
  const tracesByTick = state.courses.traces.tick;
  return tick in tracesByTick
    ? { traces: tracesByTick[tick] }
    : { traces: [] };
}

export default connect(mapStateToProps)(Expeditions);
