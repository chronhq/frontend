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
      now: this.props.now,
      min: this.props.min,
      max: this.props.max,
      isDown: false
    };
    this.scale = d3.scaleLinear().domain([this.state.min, this.state.max]).range([0, 700]);
  }

  componentDidMount() { this.renderAxis(); }

  componentWillReceiveProps(nextProps) {
    // console.log(`timeline.now ${this.timeline.now}`);
    this.setState({ now: nextProps.now });
    this.updateClockPosition(nextProps.now);
  }

  followMouse() {
    d3.select('.svgTime')
      .on('mousemove', () => {
        if (this.state.isDown) {
          const rectId = this.svgTime.childNodes[1];
          const mouseX = d3.mouse(rectId)[0];
          if (mouseX >= 0 && mouseX <= 700) {
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
    d3.selectAll('.arrow').attr('transform', translate).text(`${now}`);
    // d3.select('circle').attr('cx', this.scale(this.state.now)).attr('opacity', 1);
  }

  renderAxis() {
    const axis = d3.axisBottom(this.scale);
    const svg = d3.select(this.svgTime);

    svg.append('g')
      .attr('class', 'axisTime')
      .attr('stroke-width', 1)
      .call(axis.ticks(15, 'f'));

    svg.append('rect')
      .attr('x', 0)
      .attr('y', -50)
      .attr('width', 700)
      .attr('height', 55)
      .attr('fill', '#ffffff')
      .attr('opacity', 0)
      .style('z-index', -1)
      .classed('back', true);

    svg.on('click', () => {
      // const rectId = this.svgTime.children[1];
      const rectId = this.svgTime.childNodes[1];
      const mouseX = d3.mouse(rectId)[0];
      if (mouseX > 0 && mouseX < 700) {
        this.setState({ now: Math.round(this.scale.invert(mouseX)) });
        this.updateClockPosition();
        this.props.setYearAction(Number(this.state.now));
      }
    });

    svg.on('mousedown', () => {
      this.setState({ isDown: true });
      // d3.selectAll('.arrow').classed('active', true);
      d3.select('.triangle').attr('fill', '#2f2f2f');
      this.followMouse();
    });

    /* arrow elements */
    svg.append('rect')
      .attr('y', -10)
      .attr('width', 1)
      .attr('height', 20)
      .attr('opacity', 1)
      .attr('class', 'arrow')
      .style('fill', 'black')
      .style('stroke', 'white')
      .style('stroke-width', 2);

    // svg.append('polyline')
    //   .attr('points', '-10,-25 0, -15 10,-25')
    //   .attr('fill', 'white')
    //   .attr('stroke', 'white')
    //   .attr('stroke-width', 2)
    //   .classed('arrow triangle', true);

    svg.append('text')
      .text(`${this.state.now}`)
      .attr('font-family', 'Segoe UI')
      .attr('font-size', '16px')
      .attr('x', -20)
      .attr('y', -18)
      .attr('opacity', 1)
      .attr('text-achor', 'end')
      .classed('arrow', true)
      .attr('fill', 'white');

    svg.append('rect')
      .attr('x', -25)
      .attr('y', -50)
      .attr('width', 50)
      .attr('height', 60)
      .attr('opacity', 0)
      .classed('arrow svgTime', true)
      .style('fill', '#2f2f2f')
      .style('stroke', 'white')
      .style('stroke-width', 2);
  }

  render() {
    return (
      <div id='timeline'>
        <ControlButtons />
        <div className='test'>
          <svg
            className="svgTime"
            ref={(r) => { this.svgTime = r; }}
            width="700" height="55"
            viewBox="-50 -20 850 30"
            preserveAspectRatio="xMidYMid meet"
          />
        </div>
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
