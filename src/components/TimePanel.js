import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import React from 'react';
import PropTypes from 'prop-types';

import { select, mouse } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';

import './TimePanel.less';
import ControlButtons from '../components/ControlButtons';

@inject('store')
@observer
class TimePanel extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.resize());

    const svg = select(this.svgTime);
    svg.on('click', () => {
      const rectId = this.svgTime.childNodes[0];
      const mouseX = mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.width) {
        this.now = Math.round(this.scale.invert(mouseX))
        // this.updateClockPosition();
        this.props.store.year.setYear(Number(this.now));
      }
    // }).on('mousedown', () => {
    //   this.setState({ isDown: true });
    //   // selectAll('.arrow').classed('active', true);
    //   select('.triangle').attr('fill', '#2f2f2f');
    //   // this.followMouse();
    });
    // // Draw axis
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  // followMouse() {
  //   select('.svgTime')
  //     .on('mousemove', () => {
  //       if (this.state.isDown) {
  //         const rectId = this.svgTime.childNodes[1];
  //         const mouseX = mouse(rectId)[0];
  //         if (mouseX >= 0 && mouseX <= this.state.width) {
  //           const now = Math.round(this.scale.invert(mouseX));
  //           this.setState({ now });
  //           // this.updateClockPosition(now);
  //         }
  //         // for performance reasons this is commented
  //         // this.props.setYearAction(Number(this.state.now));
  //       }
  //     })
  //     .on('mouseup', () => {
  //       this.setState({ isDown: false });
  //       // selectAll('.arrow').classed('active', false);
  //       // selectAll('.arrow').attr('fill', '');
  //       // this.props.setYearAction(Number(this.state.now));
  //     });
  // }

  // updateClockPosition(now = this.state.now) {
    // const translate = `translate(${this.scale(now)},0)`;
    // this.setState({ arrow: translate });
    // this.setState({ position: this.scale(now) });
  // }

  /* eslint-disable class-methods-use-this */
  @computed get width() {
    return window.innerWidth < 768
      ? window.innerWidth - 100
      : window.innerWidth - 300;
  }
  /* eslint-enable */

  @computed get scale() {
    return scaleLinear()
      .domain([this.props.store.year.min, this.props.store.year.max])
      .range([0, this.width]);
  }

  resize() {
    const svgAxis = select(this.svgAxis);
    svgAxis.call(axisBottom(this.scale).ticks(parseInt(this.width / 45, 10), 'f'));
    // this.updateClockPosition();
  }

  @observable position = 0;
  @observable isDown = false;
  @observable now;

  render() {
    // const viewBox = `-15 -15 ${this.state.width + 30} 40`;
    const viewBox = `-15 -25 ${this.width + 20} 20`;
    return (
      <div id='timeline'>

        <div className='col-sm-8 col-sm-push-4'>
          <svg
            className="svgTime"
            ref={(r) => { this.svgTime = r; }}
            width='100%'
            height='55px'
            viewBox={viewBox}
            preserveAspectRatio="xMaxYMin meet"
            // preserveAspectRatio="none"
          >
            <g className="axisTime" strokeWidth="1" ref={(r) => { this.svgAxis = r; }} />
            <rect x='0' y='-25' width={this.width + 50} height='40' fill='#ffffff' opacity='0' className='back' style={{ zIndex: -1 }} />
            <g transform={`translate(${this.scale(this.props.store.year.now)}, 0)`} >
              {/*
              <g transform={this.state.arrow}>
              <rect y='-2' width='1' height='12' opacity='1' className='arrow' style={{ fill: 'black', stroke: 'white', strokeWidth: 2 }} />
              <text x='-15' y='-5' style={{ fill: 'white' }}>{this.state.now}</text>
              */}
              <circle cx='0' r={4} style={{ fill: '#02364C', stroke: 'white', strokeWidth: 1.5 }} />
            </g>
          </svg>
        </div>
        <ControlButtons />
      </div>
    );
  }
}

export default TimePanel;
