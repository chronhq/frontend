import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import { setYear } from '../reducers/timeline';
import './TimePanel.less';

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: this.props.now,
      min: this.props.min,
      max: this.props.max
    };
    this.scale = d3.scaleLinear().domain([this.state.min, this.state.max]).range([0, 1000]);
  }

  componentDidMount() {
    this.renderAxis();
    // const svgComp = d3.select('.back');
    // console.log(svgComp);
    // svgComp.on('click', () => {
    //   this.setState({ now: Math.round(this.scale.invert(d3.mouse(svgComp))) });
    //   this.updateClockPosition();
    // });
    // svgComp.on('mousedown', () => { this.followMouse(); });
  }

  componentWillReceiveProps() {
    this.renderAxis();
    this.setState({ now: this.props.now });
    this.updateClockPosition();
  }

  // followMouse() {
  //   d3.select('.svgTime')
  //     .on('mousemove', () => {
  //       this.setState({ now: Math.round(this.scale.invert(d3.mouse(this.svgTime)[0])) });
  //       this.updateClockPosition();
  //     })
  //     .on('mouseup', () => {
  //       d3.select('rect')
  //         .on('mousemove', null)
  //         .on('mouseup', () => null);
  //     });
  // }

  updateClockPosition() {
    console.log(`BOOP. Coords is ${this.scale(this.state.now)}. Year is ${this.state.now}`);
    const translate = `translate(${ this.scale(this.state.now) },0)`;
    d3.selectAll('.arrow').attr('transform', translate).text(`${this.state.now}`).attr('opacity', 1);
    // d3.select('circle').attr('cx', this.scale(this.state.now)).attr('opacity', 1);
    if (this.props.playing === 0) this.props.setYearAction(Number(this.state.now));
  }


  renderAxis() {
    const axis = d3.axisBottom(this.scale);


    const svg = d3.select(this.svgTime),
      margin = { top: 20, right: 20, bottom: 20, left: 40 },
      width = +svg.attr('width') - margin.left - margin.right;

    svg.style('border', '1px solid black').append('g')
      .call(axis.ticks(20, 'f'));

    svg.append('rect')
      .attr('x', 0)
      .attr('y', -50)
      .attr('width', width)
      .attr('height', 100)
      .attr('fill', '#ffffff')
      .attr('opacity', 0)
      .style('z-index', -1)
      .classed('back', true)
      .on('click', () => {
        const rectId = this.svgTime.children[1];
        const mouseX = d3.mouse(rectId)[0];
        this.setState({ now: Math.round(this.scale.invert(mouseX)) });
        this.updateClockPosition();
      });


/* arrow elements */
    svg.append('rect')
      .attr('y', -10)
      .attr('width', 1)
      .attr('height', 20)
      .attr('opacity', 1)
      .attr('class', 'arrow')
      .style('fill', 'black')
      .style('stroke', 'black')
      .style('stroke-width', 2);

    svg.append('polyline')
      .attr('points', '-10,-25 0,-15 10,-25')
      .style('fill', 'black')
      .classed('arrow', true);

    svg.append('text')
      .text(`${this.state.now}`)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '16px')
      .attr('x', -20)
      .attr('y', -30)
      .attr('opacity', 1)
      .attr('text-achor', 'end')
      .classed('arrow', true)
      .attr('fill', 'black');
  }

  render() {
    return (
      <div id='timeline'>
        <svg
          className="svgTime"
          ref={(r) => { this.svgTime = r; }}
          width="1100" height="200"
          viewBox="-50 0 1150 50"
          preserveAspectRatio="xMidYMid meet"
        />
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
  playing: PropTypes.number.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(TimePanel);
