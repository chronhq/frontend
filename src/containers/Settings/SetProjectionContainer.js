import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';

import { InputNumber } from '../../components/Input';
import { setProjection } from '../../reducers/runtime/projection';

import './SetProjectionContainer.less'; // Styles for Select

class SetProjectionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      yawn: this.props.rotate[0],
      pitch: this.props.rotate[1],
      roll: this.props.rotate[2],
    };
  }
  handleChange = (data) => {
    this.setState({ ...this.state, ...data });
  }
  handleSelect = (val) => {
    this.handleChange({ name: val.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const rotate = [this.state.yawn, this.state.pitch, this.state.roll];
    this.props.setProjectionAction(rotate, this.state.name);
  }
  render() {
    return (
      <div className='changeProjBtn'>
        <form onSubmit={this.handleSubmit} className='test'>
          <div className='yprControl'>
            {' Y'}<InputNumber name='yawn' value={this.state.yawn} cb={this.handleChange} />
            {' P'}<InputNumber name='pitch' value={this.state.pitch} cb={this.handleChange} />
            {' R'}<InputNumber name='roll' value={this.state.roll} cb={this.handleChange} />
          </div>
          <div className='form-group'>
            <Select
              name='Select Projection'
              value={this.state.name}
              options={this.props.options}
              onChange={this.handleSelect}
            />
          </div>
          <button type='submit' className='btn btn-default'>
            Установить {this.state.value}
          </button>
        </form>
      </div>
    );
  }

}
function mapStateToProps(state) {
  return {
    name: state.runtime.projection.name,
    rotate: state.runtime.projection.rotate,
    options: state.runtime.projection.options
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setProjectionAction: bindActionCreators(setProjection, dispatch),
  };
}
SetProjectionContainer.propTypes = {
  name: PropTypes.string.isRequired,
  rotate: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  setProjectionAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetProjectionContainer);
