import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import React from 'react';

import { select, mouse } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';

@inject('store')
@observer
class SeekBar extends React.Component {

  componentDidMount() {
    const svg = select(this.svgTime);
    svg.on('click', () => {
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
    this.renderBar();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width != this.props.width) {
      this.renderBar();
    }
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

  @computed get scale() {
    return scaleLinear()
      .domain([this.props.store.year.min, this.props.store.year.max])
      // .range([0, 300]);
      .range([0, this.props.width]);
  }

  // resize() {
  //   console.log('trigger resize');
  //   // const svgAxis =
  //   select(this.svgAxis).call(axisBottom(this.scale).ticks(parseInt(this.width / 45, 10), 'f'));
  //   // this.updateClockPosition();
  //   this.forceUpdate();
  // }

  @observable position = 0;
  @observable isDown = false;
  @observable now;

  renderBar() {
    const axis = axisBottom(this.scale).ticks(parseInt(this.props.width / 45, 10), 'f');
    select(this.svgAxis).call(axis);
  }


  render() {
    const viewBox = `-15 -25 ${this.props.width + 30} 50`;
    return (
      <div className='timepanel__slider'>
        <svg
          className="svgTime"
          ref={(r) => { this.svgTime = r; }}
          // width='100%'
          width={this.props.width}
          // height='55px'
          viewBox={viewBox}
          preserveAspectRatio="xMaxYMin meet"
          // preserveAspectRatio="none"
        >
          <g className="axisTime" strokeWidth="1" ref={(r) => { this.svgAxis = r; }} />
          <g transform={`translate(${this.scale(this.props.store.year.now)}, 0)`} >
            <circle cx='0' r={4} style={{ fill: '#02364C', stroke: 'white', strokeWidth: 1.5 }} />
          </g>
          <rect x='0' y='-25' width={this.props.width + 50} height='40' fill='#ffffff' opacity='0' className='back' style={{ zIndex: -1 }} />
          {/*
          */}
        </svg>
      </div>
    );
  }
}

export default SeekBar;
