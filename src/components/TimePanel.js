import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import { setYear } from '../reducers/timeline';
import './TimePanel.less';
import ControlButtons from '../components/ControlButtons';

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrow: 'translate(0,0)',
      width: this.width,
      now: this.props.now,
      min: this.props.min,
      max: this.props.max,
      isDown: false
    };
  }

  get scale() {
    return d3
    .scaleLinear()
    .domain([this.state.min, this.state.max])
    .range([0, this.state.width]);
  }

  get width() {
    return window.innerWidth < 768
      ? window.innerWidth - 100
      : window.innerWidth - 300;
  }


  componentDidMount() {
    window.addEventListener('resize', () => this.resize());

    const svg = d3.select(this.svgTime);
    svg.on('click', () => {
      const rectId = this.svgTime.childNodes[0];
      const mouseX = d3.mouse(rectId)[0];
      if (mouseX > 0 && mouseX < this.state.width) {
        this.setState({ now: Math.round(this.scale.invert(mouseX)) });
        this.updateClockPosition();
        this.props.setYearAction(Number(this.state.now));
      }
    }).on('mousedown', () => {
      this.setState({ isDown: true });
      // d3.selectAll('.arrow').classed('active', true);
      d3.select('.triangle').attr('fill', '#2f2f2f');
      this.followMouse();
    });
  // Draw axis
  this.resize();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(`timeline.now ${this.timeline.now}`);
    this.setState({ now: nextProps.now });
    this.updateClockPosition(nextProps.now);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize());
  }

  followMouse() {
    d3.select('.svgTime')
      .on('mousemove', () => {
        if (this.state.isDown) {
          const rectId = this.svgTime.childNodes[1];
          const mouseX = d3.mouse(rectId)[0];
          if (mouseX >= 0 && mouseX <= this.state.width) {
            const now = Math.round(this.scale.invert(mouseX));
            this.setState({ now });
            this.updateClockPosition(now);
          }
          // for performance reasons this is commented
          this.props.setYearAction(Number(this.state.now));
        }
      })
      .on('mouseup', () => {
        this.setState({ isDown: false });
        // d3.selectAll('.arrow').classed('active', false);
        // d3.selectAll('.arrow').attr('fill', '');
        this.props.setYearAction(Number(this.state.now));
      });
  }

  updateClockPosition(now = this.state.now) {
    const translate = `translate(${this.scale(now)},0)`;
    this.setState({ arrow: translate })
  }

  resize() {
    const width = this.width;
    this.setState({ width });
    const svgAxis = d3.select(this.svgAxis);
    svgAxis.call(d3.axisBottom(this.scale).ticks(parseInt(width / 45), 'f'));
    this.updateClockPosition();
  }

  render() {
    const viewBox = '-10 -15 ' + (this.state.width + 20) + ' 40';
    return (
      <div id='timeline' className='row'>
        <div className='col-sm-9 col-sm-push-3'>
          <svg
            className="svgTime"
            ref={(r) => { this.svgTime = r; }}
            width='100%'
            height='55px'
            viewBox={viewBox}
            // preserveAspectRatio="xMaxYMin meet"
            preserveAspectRatio="none"
          >
          <g className="axisTime" strokeWidth="1" ref={(r) => { this.svgAxis = r; }} />
            <rect x='0' y='-50' width={this.state.width + 50} height='55' fill='#ffffff' opacity='0' className='back' style={{zIndex: -1}} />
            <rect y='-10' width='1' height='20' opacity='1' className='arrow' transform={this.state.arrow} style={{fill: 'black', stroke: 'white', strokeWidth: 2}} />
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
    now: state.timeline.now,
    max: state.timeline.max,
    min: state.timeline.min
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
