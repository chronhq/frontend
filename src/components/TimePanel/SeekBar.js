import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import React from 'react';

import { select, mouse } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';

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

@inject('store')
@observer
class SeekBar extends React.Component {
  @observable position = 0;

  @observable isDown = false;

  componentDidMount() {
    const svg = select(this.svgTime);
    svg.on('mouseup', () => {
      const rectId = this.svgTime.childNodes[0];
      const mouseX = mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.width) {
        this.now = Math.round(this.scale.invert(mouseX));
        // this.updateClockPosition();
        this.props.store.year.setYear(Number(this.now));
      }
    // }).on('mousedown', () => {
    //   this.setState({ isDown: true });
    //   // selectAll('.arrow').classed('active', true);
    //   select('.triangle').attr('fill', '#2f2f2f');
    //   // this.followMouse();
    });
  }

  @computed get width() {
    return this.props.store.deck.innerWidth < 600
      ? this.props.store.deck.innerWidth
      : this.props.store.deck.innerWidth - 400;
  }

  @computed get scale() {
    return scaleLinear()
      .domain([this.props.store.year.min, this.props.store.year.max])
      .range([0, this.width]);
  }

  @observable now;
  // this is functions used to drag seeker circle and update info on the fly
  // disabled for performance reasons

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


  render() {
    const viewBox = `-15 -15 ${this.width + 30} 50`;
    return (
      <div className='timepanel__slider'>
        <svg
          className="svgTime"
          ref={(r) => { this.svgTime = r; }}
          width={this.width}
          viewBox={viewBox}
          preserveAspectRatio="xMaxYMin meet"
        >
          <Axis width={this.width} scale={this.scale} />
          <circle
            cx='0'
            r={4}
            style={{ fill: '#02364C', stroke: 'white', strokeWidth: 1.5 }}
            transform={`translate(${this.scale(this.props.store.year.now)}, 0)`}
          />
          <rect
            x='0'
            y='-10'
            width={this.width + 50}
            height='30'
            opacity='0'
            style={{ zIndex: -1 }}
          />
        </svg>
      </div>
    );
  }
}

export default SeekBar;
