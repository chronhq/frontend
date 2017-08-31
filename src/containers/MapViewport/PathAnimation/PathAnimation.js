import React from 'react';
import PropTypes from 'prop-types';
import { line, curveNatural } from 'd3-shape';
import { select } from 'd3-selection';
import { easeLinear } from 'd3-ease';
import { transition } from 'd3-transition';
import './PathAnimation.less';

class PathAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 25,
      vy: 20,
      animated: false
    };
    this.line = line().curve(curveNatural);
  }

  componentDidMount() {
    this.container = select(this.container);
    this.renderPath();
    // comment this
    this.animateShip();
    this.animatePath();
  }


  animateShip() {
    const node = select(this.circle);
    node.transition()
      .duration(4000)
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
      .style('stroke-width', '4px')
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
      .duration(4000)
      .attr('stroke-dashoffset', 0)
      .ease(easeLinear)
      .on('end', () => this.transitionPath());
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
      .style('stroke-dasharray', '4,4')
      .data([this.props.points])
      .attr('d', this.line);
  }

  render() {
    return (
      <g ref={(r) => { this.container = r; }} >
        <circle
          ref={(c) => { this.circle = c; }}
          r={5}
        />
      </g>
    );
  }
}


PathAnimation.propTypes = {
  points: PropTypes.array.isRequired
};

// figure for testing directional movements
// <path d="M 0 0 L 10 5 L 0 10 z" />

export default PathAnimation;
