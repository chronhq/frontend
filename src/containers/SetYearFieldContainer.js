import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setYear } from '../reducers/timeline';

class SetYearFieldContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: this.props.now };
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    this.props.setYearAction(Number(this.state.value));
  }
  render() {
    return (
      <span className='playButton'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='range'
            min={this.props.min}
            max={this.props.max}
            value={this.state.value}
            step='1'
            onChange={this.handleChange}
          />{' '}
          <button type="submit">
            Set {this.state.value}
          </button>
        </form>
      </span>
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
SetYearFieldContainer.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  now: PropTypes.number.isRequired,
  setYearAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetYearFieldContainer);
