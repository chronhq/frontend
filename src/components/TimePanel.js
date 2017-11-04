import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { select, mouse } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleLinear } from 'd3-scale';

import { setYear } from '../reducers/actions';
import './TimePanel.less';
import ControlButtons from '../components/ControlButtons';

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // arrow: 'translate(0,0)',
      position: 0,
      width: this.width,
      now: this.props.now,
      isDown: false
    };
  }


  componentDidMount() {
    window.addEventListener('resize', () => this.resize());

    const svg = select(this.svgTime);
    svg.on('click', () => {
      const rectId = this.svgTime.childNodes[0];
      const mouseX = mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.state.width) {
        this.setState({ now: Math.round(this.scale.invert(mouseX)) });
        // this.updateClockPosition();
        this.props.setYearAction(Number(this.state.now));
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

  componentWillReceiveProps(nextProps) {
    // console.log(`timeline.now ${this.timeline.now}`);
    this.setState({ now: nextProps.now });
    // this.updateClockPosition(nextProps.now);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  get scale() {
    return scaleLinear()
      .domain([this.props.min, this.props.max])
      .range([0, this.state.width]);
  }

  /* eslint-disable class-methods-use-this */
  get width() {
    return window.innerWidth < 768
      ? window.innerWidth - 100
      : window.innerWidth - 300;
  }
  /* eslint-enable */

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

  resize() {
    const width = this.width;
    this.setState({ width });
    const svgAxis = select(this.svgAxis);
    svgAxis.call(axisBottom(this.scale).ticks(parseInt(width / 45, 10), 'f'));
    // this.updateClockPosition();
  }

  render() {
    // const viewBox = `-15 -15 ${this.state.width + 30} 40`;
    const viewBox = `-15 -25 ${this.state.width + 20} 20`;
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
            <rect x='0' y='-25' width={this.state.width + 50} height='40' fill='#ffffff' opacity='0' className='back' style={{ zIndex: -1 }} />
            <g transform={`translate(${this.scale(this.props.now)}, 0)`} >
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

function mapStateToProps(state) {
  return {
    playing: state.timeline.intervalId,
    now: state.timeline.year.now,
    max: state.timeline.year.max,
    min: state.timeline.year.min
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setYearAction: bindActionCreators(setYear, dispatch),
  };
}


TimePanel.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  setYearAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(TimePanel);
