import React from 'react';
import { inject, observer } from 'mobx-react';
import { action, computed, observable } from 'mobx';

import { InputNumber, InputCheckBox, InputSelect } from '../../components/Input';

import './SetProjectionContainer.less'; // Styles for Select

@inject('store')
@observer
class SetProjectionContainer extends React.Component {
  @computed get clip() {
    return [[this.clipLeft, this.clipTop], [this.clipRight, this.clipBottom]];
  }

  @computed get rotate() {
    return [this.yawn, this.pitch, this.roll];
  }

  @computed get center() {
    return [this.centerLat, this.centerLon];
  }

  @computed get projection() {
    return {
      clip: this.clip,
      rotate: this.rotate,
      center: this.center,
      name: this.name,
      clipEnabled: this.clipEnabled,
    };
  }

  @action handleChange(data) {
    Object.keys(data).map((cur) => {
      this[cur] = data[cur];
      return false;
    });
  }

  @action handleSelect(val) {
    this.name = val.value;
  }

  @action validateClip() {
    // wipe clip settings if clip is disabled
    const { defaultClip } = this.props.store.projection;
    if (JSON.stringify(this.clip) !== defaultClip
    && Boolean(this.clipEnabled) !== true) {
      const clip = JSON.parse(defaultClip);
      const { 0: clipLeft, 1: clipTop } = clip[0];
      const { 0: clipRight, 1: clipBottom } = clip[1];
      this.clipLeft = clipLeft;
      this.clipTop = clipTop;
      this.clipRight = clipRight;
      this.clipBottom = clipBottom;
    }
  }

  @action handleSubmit() {
    this.validateClip();
    this.props.store.projection.setup(this.projection);
  }

  @observable clipEnabled = this.props.store.projection.clipEnabled;
  @observable name = this.props.store.projection.name;
  @observable clipLeft = this.props.store.projection.clip[0][0];
  @observable clipTop = this.props.store.projection.clip[0][1];
  @observable clipRight = this.props.store.projection.clip[1][0];
  @observable clipBottom = this.props.store.projection.clip[1][1];
  @observable yawn = this.props.store.projection.rotate[0];
  @observable pitch = this.props.store.projection.rotate[1];
  @observable roll = this.props.store.projection.rotate[2];
  @observable centerLat = this.props.store.projection.center[0];
  @observable centerLon = this.props.store.projection.center[1];

  render() {
    const options = JSON.parse(JSON.stringify(this.props.store.projection.options));

    return (
      <div className='changeProjBtn'>
        {this.props.store.flags.flags.UI.devProjection &&
          <div className='test'>
            <div className='form-group'>
              <InputSelect
                name='Select Projection'
                value={this.name}
                options={options}
                onChange={d => this.handleSelect(d)}
              />
            </div>
            <div className='yprControl'>
              <p>Выполнить поворот</p>
              {' Y'}<InputNumber name='yawn' value={this.yawn} cb={d => this.handleChange(d)} />
              {' P'}<InputNumber name='pitch' value={this.pitch} cb={d => this.handleChange(d)} />
              {' R'}<InputNumber name='roll' value={this.roll} cb={d => this.handleChange(d)} />
            </div>
            <div>
              <p>Установить центр</p>
              {' Долгота '}<InputNumber name='centerLon' value={this.centerLon} cb={d => this.handleChange(d)} />
              {' Широта '}<InputNumber name='centerLat' value={this.centerLat} cb={d => this.handleChange(d)} />
            </div>
            <br />
            <div>
              <InputCheckBox
                name='clipEnabled'
                label="Обрезать контур карты"
                checked={this.clipEnabled}
                cb={d => this.handleChange(d)}
              />
              {Boolean(this.clipEnabled) === true ?
                <div>
                  <p>Установить значение граничных точек в градусах</p>
                  {'   Левая '}<InputNumber name='clipLeft' value={this.clipLeft} cb={d => this.handleChange(d)} />
                  {' Верхняя '}<InputNumber name='clipTop' value={this.clipTop} cb={d => this.handleChange(d)} />
                  <br />
                  {' Правая '}<InputNumber name='clipRight' value={this.clipRight} cb={d => this.handleChange(d)} />
                  {' Нижняя '}<InputNumber name='clipBottom' value={this.clipBottom} cb={d => this.handleChange(d)} />
                </div>
                : ''
              }
              <br />
              <button onClick={() => this.handleSubmit()} className='btn btn-default'>
                Установить
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default SetProjectionContainer;
