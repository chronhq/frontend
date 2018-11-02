import React from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

import './Axis.less';

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const axis = axisBottom()
      .scale(this.props.scale)
      .tickPadding([6])
      .tickSize(10)
      .ticks(parseInt(this.props.width / 45, 10), 'f');
    select(this.svgAxis).call(axis);
  }

  render() {
    return (
      <g
        className="axisTime"
        strokeWidth="1"
        ref={(r) => { this.svgAxis = r; }}
      />
    );
  }
}

export default Axis;
