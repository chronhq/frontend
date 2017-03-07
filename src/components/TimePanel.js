import React from 'react';
import * as d3 from 'd3';

import './TimePanel.less';

class Timeline extends React.Component {
  state = { xClockPos: 0 }

  componentDidMount() {
    this.renderAxis();
    const svgComp = d3.select('svg');

    svgComp.on('click', () => { this.updateClockPosition(); });


    svgComp.on('mousedown', () => { this.followMouse(); });
  }
  componentDidUpdate() { this.renderAxis(); }

  followMouse() {
    console.log('mousedown');
    d3.select('circle')
      .on('mousemove', () => { this.updateClockPosition(); })
      .on('mouseup', () => { this.stopFollowing(); });
  }

  stopFollowing() {
    d3.select('circle')
        .on('mousemove', null)
        .on('mouseup', () => null);
  }


  updateClockPosition() {
    this.xClockPos = d3.mouse(this.svgTime)[0];
    console.log(`Coords x is ${this.xClockPos}`);
    d3.select('circle').attr('cx', this.xClockPos);
  }


  renderAxis() {
    const scale = d3.scaleLinear()
      .domain([1700, 2015])
      .range([0, 1000]);

    const axis = d3.axisBottom(scale);

    const svg = d3.select('svg')
      .append('g')
      .call(axis.ticks(20, 'f'));

    svg.append('circle')
    .attr('cx', this.xClockPos)
    .attr('cy', 0)
    .attr('r', 5)
    .attr('class', 'circle')
    .style('fill', 'red')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 4);
  }


  render() {
    return (
      <div id='timeline'>
        <svg
          className="svgTime"
          ref={(r) => { this.svgTime = r; }}
          width="1100" height="50"
          viewBox="0 0 900 20"
          preserveAspectRatio="xMidYMid meet"
        >
        </svg>
      </div>
    );
  }
}


const TimelineTest = () => (
  <div className='svgTime'> Test </div>
);

export default Timeline;
