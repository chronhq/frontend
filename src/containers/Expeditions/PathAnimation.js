import React from 'react';
import PropTypes from 'prop-types';
import { line, curveCardinal } from 'd3-shape';
import { select } from 'd3-selection';
import { easeLinear } from 'd3-ease';
// import { transition } from 'd3-transition';
// import './PathAnimation.less';

class PathAnimation extends React.Component {
  componentDidMount() {
    this.line = line().curve(curveCardinal);
    this.container = select(this.container);
    this.renderPath();
    // comment this
    this.animateShip();
    this.animatePath();
  }

  animateShip() {
    const node = select(this.circle);
    node.transition()
      .duration(this.props.duration)
      .attrTween('transform', this.translateAlong(this.path.node()))
      .ease(easeLinear)
      .on('end', () => this.animateShip());
  }

  translateAlong = (path) => {
    const pathLength = path.getTotalLength();
    return function () {
      return function (t) {
        const p = path.getPointAtLength(t * pathLength);
        return `translate(${p.x},${p.y})`;
      };
    };
  };

  animatePath() {
    this.newPath = this.container
      .append('path')
      .style('stroke', '#00f')
      .style('fill', 'none')
      .style('stroke-width', '0.1px')
      .data([this.props.points])
      .attr('d', this.line);

    this.transitionPath();
  }

  transitionPath() {
    const totalLength = this.newPath.node().getTotalLength();
    this.newPath
      .attr('stroke-dasharray', `${totalLength}  ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(this.props.duration)
      .attr('stroke-dashoffset', 0)
      .ease(easeLinear)
      .on('end', () => this.transitionPath()); // loop
  }

  animateAll() {
    this.animateShip();
    this.animatePath();
  }

  renderPath() {
    this.path = this.container
      .append('path')
      .classed('expedition', true)
      .style('stroke', '#222')
      .style('fill', 'none')
      .style('stroke-width', '0.1px')
      .style('stroke-dasharray', '0.5, 0.5')
      .data([this.props.points])
      .attr('d', this.line);
  }

  render() {
    return (
      <g ref={(r) => { this.container = r; }} >
        <circle
          ref={(c) => { this.circle = c; }}
          r={0.2}
        />
      </g>
    );
  }
}

PathAnimation.defaultProps = {
  duration: 8000
};

PathAnimation.propTypes = {
  points: PropTypes.array.isRequired,
  duration: PropTypes.number
};

// figure for testing directional movements
// <path d="M 0 0 L 10 5 L 0 10 z" />

export default PathAnimation;
