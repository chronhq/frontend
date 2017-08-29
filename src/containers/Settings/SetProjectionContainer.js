import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Flag } from 'flag';

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
      centerLon: this.props.center[0],
      centerLat: this.props.center[1],
      clipLeft: this.props.clip[0][0],
      clipTop: this.props.clip[0][1],
      clipRight: this.props.clip[1][0],
      clipBottom: this.props.clip[1][1],
      clipEnabled: (JSON.stringify(this.props.clip) !== JSON.stringify(defaultClip)),
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
    const clip = this.state.clipEnabled
      ? [[this.state.clipLeft, this.state.clipTop],
        [this.state.clipRight, this.state.clipBottom]]
      : defaultClip;
    const center = [this.state.centerLon, this.state.centerLat];
    this.props.setProjectionAction({
      rotate,
      center,
      clip,
      name: this.state.name
    });
  }
  devProjectionSettings() {
    return (
      <div>
        <InputCheckBox
          name='clipEnabled'
          label="Обрезать контур карты"
          checked={this.state.clipEnabled}
          cb={this.handleChange}
        />
        {this.state.clipEnabled ?
          <div>
            <p>Установить значение граничных точек в градусах</p>
            {'   Левая '}<InputNumber name='clipLeft' value={this.state.clipLeft} cb={this.handleChange} />
            {' Верхняя '}<InputNumber name='clipTop' value={this.state.clipTop} cb={this.handleChange} />
            <br />
            {' Правая '}<InputNumber name='clipRight' value={this.state.clipRight} cb={this.handleChange} />
            {' Нижняя '}<InputNumber name='clipBottom' value={this.state.clipBottom} cb={this.handleChange} />
          </div>
          : ''
        }
        <br />
      </div>
    );
  }

  render() {
    return (
      <div className='changeProjBtn'>
        <form onSubmit={this.handleSubmit} className='test'>
          <div className='form-group'>
            <Select
              name='Select Projection'
              value={this.state.name}
              options={this.props.options}
              onChange={this.handleSelect}
            />
          </div>
          <div className='yprControl'>
            <p>Выполнить поворот</p>
            {' Y'}<InputNumber name='yawn' value={this.state.yawn} cb={this.handleChange} />
            {' P'}<InputNumber name='pitch' value={this.state.pitch} cb={this.handleChange} />
            {' R'}<InputNumber name='roll' value={this.state.roll} cb={this.handleChange} />
          </div>
          <div>
            <p>Установить центр</p>
            {' Долгота '}<InputNumber name='centerLon' value={this.state.centerLon} cb={this.handleChange} />
            {' Широта '}<InputNumber name='centerLat' value={this.state.centerLat} cb={this.handleChange} />
          </div>
          <br />
          <Flag
            name="UI.devProjection"
            render={() => this.devProjectionSettings()}
          />
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
  clip: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  setProjectionAction: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetProjectionContainer);
