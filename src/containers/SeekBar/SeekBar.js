import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import React from 'react';

import { select, mouse } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

import Axis from '../../components/TimePanelAxis/Axis';
import Cursor from '../../components/TimePanelAxis/AxisCircle';

import './SeekBar.less';

@inject('store')
@observer
class SeekBar extends React.Component {
  @observable isDown = false;

  componentDidMount() {
    const svg = select(this.svgTime);
    svg.on('mouseup', () => {
      this.isDown = false;
      this.unfollowMouse();
      const rectId = this.svgTime.childNodes[0];
      const mouseX = mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.width) {
        this.props.store.year.setYear(Math.round(this.scale.invert(mouseX)));
      }
    });
    svg.on('mousedown', () => {
      this.isDown = true;
      this.followMouse();
    });
  }

  @computed get width() {
    return this.props.store.deck.width < 600
      ? this.props.store.deck.width
      : this.props.store.deck.width - 300;
  }

  @computed get scale() {
    return scaleLinear()
      .domain([this.props.store.year.min, this.props.store.year.max])
      .range([0, this.width]);
  }

  @computed get translate() {
    return this.scale(this.props.store.year.tuneValue);
  }


  followMouse() {
    select(this.svgTime)
      .on('mousemove', () => {
        const rectId = this.svgTime.childNodes[0];
        const mouseX = mouse(rectId)[0];
        if (mouseX >= 0 && mouseX <= this.width) {
          const now = Math.round(this.scale.invert(mouseX));
          this.props.store.year.setTuneValue(now);
        }
      });
  }

  unfollowMouse() {
    select(this.svgTime)
      .on('mousemove', null);
  }

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
          <Cursor translate={this.translate} active={this.isDown} />
          {/*
            <rect
              x='0'
              y='-15'
              width={this.width}
              height='50'
              opacity='0'
              style={{ zIndex: -1 }}
            />
          */}
        </svg>
      </div>
    );
  }
}

export default SeekBar;
