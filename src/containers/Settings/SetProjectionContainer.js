import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';

import { InputNumber, InputCheckBox } from '../../components/Input';
import { setProjection } from '../../reducers/actions';
import { defaultClip } from '../../reducers/runtime/projection';

import './SetProjectionContainer.less'; // Styles for Select

class SetProjectionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      yawn: this.props.rotate[0],
      pitch: this.props.rotate[1],
      roll: this.props.rotate[2],
      centerLat: this.props.center[0],
      centerLon: this.props.center[1],
      topLeftLat: this.props.clip[0][1],
      topLeftLon: this.props.clip[0][0],
      bottomRightLat: this.props.clip[1][1],
      bottomRightLon: this.props.clip[1][0],
      clipIsEnabled: this.props.clip === defaultClip,
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
    const clip = this.state.clipIsEnabled
      ? [[this.state.topLeftLon, this.state.topLeftLat],
        [this.state.bottomRightLat, this.state.bottomRightLat]]
      : defaultClip;
    const center = [this.state.centerLon, this.state.centerLat];
    this.props.setProjectionAction({
      rotate,
      center,
      clip,
      name: this.state.name
    });
  }
  drawPointInput = name => (
    <div>
      {' lon'}<InputNumber name={`${name}Lon`} value={this.state[`${name}Lon`]} cb={this.handleChange} />
      {' lat'}<InputNumber name={`${name}Lat`} value={this.state[`${name}Lat`]} cb={this.handleChange} />
    </div>
  )

  render() {
    return (
      <div className='changeProjBtn'>
        <form onSubmit={this.handleSubmit} className='test'>
          <div className='yprControl'>
            {' Y'}<InputNumber name='yawn' value={this.state.yawn} cb={this.handleChange} />
            {' P'}<InputNumber name='pitch' value={this.state.pitch} cb={this.handleChange} />
            {' R'}<InputNumber name='roll' value={this.state.roll} cb={this.handleChange} />
          </div>
          <p>Установить центр</p>
          {this.drawPointInput('center')}
          <InputCheckBox
            name='clipIsEnabled'
            label="Обрезать контур карты"
            checked={this.state.clipIsEnabled}
            cb={this.handleChange}
          />
          {this.state.clipIsEnabled ?
            <div>
              <p>Установить левую верхнюю точку</p>
              {this.drawPointInput('topLeft')}
              <p>Установить правую нижнюю точку</p>
              {this.drawPointInput('bottomRight')}
            </div>
            : ''
          }
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
    center: state.runtime.projection.center,
    clip: state.runtime.projection.clip,
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
  center: PropTypes.array.isRequired,
  clip: PropTypes.array,
  options: PropTypes.array.isRequired,
  setProjectionAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetProjectionContainer);
