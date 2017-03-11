import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import * as d3 from 'd3';
import { setYear } from '../reducers/timeline';
import './TimePanel.less';
import ControlButtonsController from '../containers/ControlButtonsController';

class TimePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: this.props.now,
      min: this.props.min,
      max: this.props.max
    };
    this.scale = d3.scaleLinear().domain([this.state.min, this.state.max]).range([0, 700]);
  }

  componentDidMount() { this.renderAxis(); }

  componentWillReceiveProps(nextProps) {
    // console.log(`timeline.now ${this.timeline.now}`);
    this.setState({ now: nextProps.now });
    this.updateClockPosition();
  }

  followMouse() {
    d3.select(this.svgTime.children[1])
      .on('mousemove', () => {
        const rectId = this.svgTime.children[1];
        const mouseX = d3.mouse(rectId)[0];
        this.setState({ now: Math.round(this.scale.invert(mouseX)) });
        this.updateClockPosition();
        // for performance reasons this is commented
        // this.props.setYearAction(Number(this.state.now));
      })
      .on('mouseup', () => {
        console.log('mouseup event');
        this.props.setYearAction(Number(this.state.now));
        // d3.select select wrong. Mouseup event not happening.
        // d3.select(this.svgTime.children[1])
        d3.select('.svgTime')
          .on('mousemove', () => null)
          .on('mouseup', () => null);
      });
  }

  updateClockPosition() {
    const translate = `translate(${this.scale(this.state.now)},0)`;
    d3.selectAll('.arrow').attr('transform', translate).text(`${this.state.now}`).attr('opacity', 1);
    // d3.select('circle').attr('cx', this.scale(this.state.now)).attr('opacity', 1);
  }

  renderAxis() {
    const axis = d3.axisBottom(this.scale);
    const svg = d3.select(this.svgTime);

    svg.append('g')
      .attr('class', 'axisTime')
      .call(axis.ticks(15, 'f'));

    svg.append('rect')
      .attr('x', 0)
      .attr('y', -50)
      .attr('width', 700)
      .attr('height', 60)
      .attr('fill', '#ffffff')
      .attr('opacity', 0)
      .style('z-index', -1)
      .classed('back', true);

    svg.on('click', () => {
      const rectId = this.svgTime.children[1];
      const mouseX = d3.mouse(rectId)[0];
      this.setState({ now: Math.round(this.scale.invert(mouseX)) });
      this.updateClockPosition();
      this.props.setYearAction(Number(this.state.now));
    });

    svg.on('mousedown', () => { this.followMouse(); });


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

    svg.append('polyline')
      .attr('points', '-10,-25 0, -15 10,-25')
      .style('fill', 'white')
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
      .attr('fill', 'white');
  }

  render() {
    return (
      <div id='timeline' className='container'>
        <ControlButtonsController className='col-lg-4 col-md-4' />
        <div className='col-lg-5 col-md-5'>
          <svg
            className="svgTime"
            ref={(r) => { this.svgTime = r; }}
            width="700" height="90"
            viewBox="-50 0 750 10"
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
