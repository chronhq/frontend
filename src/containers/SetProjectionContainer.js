import React, { PropTypes, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InputNumber from '../components/inputNumber';
import { setProjection } from '../reducers/projection';

class SetProjectionContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      yawn: this.props.rotate[0],
      pitch: this.props.rotate[1],
      roll: this.props.rotate[2],
      scale: this.props.scale
    };
  }
  handleChange = (data) => {
    this.setState({ ...this.state, ...data });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const rotate = [this.state.yawn, this.state.pitch, this.state.roll];
    this.props.setProjectionAction(this.state.scale, rotate);
  }
  render() {
    return (
      <span className='playButton'>
        <form onSubmit={this.handleSubmit}>
          {' Y'}<InputNumber name='yawn' value={this.state.yawn} cb={this.handleChange} />
          {' P'}<InputNumber name='pitch' value={this.state.pitch} cb={this.handleChange} />
          {' R'}<InputNumber name='roll' value={this.state.roll} cb={this.handleChange} />
          {' Scale'}<InputNumber name='scale' value={this.state.scale} cb={this.handleChange} />

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
    rotate: state.projection.rotate,
    scale: state.projection.scale,
    list: state.projection.byName
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setProjectionAction: bindActionCreators(setProjection, dispatch),
  };
}
SetProjectionContainer.propTypes = {
  rotate: PropTypes.array.isRequired,
  scale: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  setProjectionAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetProjectionContainer);
