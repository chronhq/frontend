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
    this.scale = d3.scaleLinear().domain([this.state.min, this.state.max]).range([30, 1000]);
  }
  componentDidMount() {
    this.renderAxis();
    const svgComp = d3.select(this.svgTime);
    svgComp.on('click', () => {
      this.setState({ now: Math.round(this.scale.invert(d3.mouse(this.svgTime)[0])) });
      this.updateClockPosition();
    });
    svgComp.on('mousedown', () => { this.followMouse(); });
  }

  componentWillReceiveProps() {
    this.renderAxis();
    this.setState({ now: this.props.now });
    this.updateClockPosition();
  }

  followMouse() {
    d3.select('circle')
      .on('mousemove', () => {
        this.setState({ now: Math.round(this.scale.invert(d3.mouse(this.svgTime)[0])) });
        this.updateClockPosition();
      })
      .on('mouseup', () => {
        d3.select('circle')
          .on('mousemove', null)
          .on('mouseup', () => null);
      });
  }

  updateClockPosition() {
    console.log(`BOOP. Coords is ${this.scale(this.state.now)}. Year is ${this.state.now}`);
    /* d3.select('circle').attr('opacity', 1); */
    //
    d3.select('circle').attr('cx', this.scale(this.state.now)).attr('opacity', 1);
    //this.props.setYearAction(Number(this.state.now));
  }


  renderAxis() {
    const axis = d3.axisBottom(this.scale);

    const svg = d3.select('.svgTime')
      .append('g')
      .call(axis.ticks(20, 'f'));

    svg.append('circle')
      .attr('r', 5)
      .attr('opacity', 0)
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
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
