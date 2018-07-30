import React from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import ControlButtons from '../../components/TimePanel/ControlButtons';
import AlignToggler from '../../components/AlignToggler';
import { InputCheckBox } from '../../components/Input';

@inject('store')
@observer
class Animation extends React.Component {
  @action handleChange() {
    this.props.store.flags.flags.runtime.animation = !this.props.store.flags.flags.runtime.animation;
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justfyContent: 'space-between' }}>
          <button onClick={() => this.props.store.animation.startAnimation()} type='button'>
            Start Animation
          </button>
          <button onClick={() => this.props.store.animation.stopAnimation()} type='button'>
            Stop Animation
          </button>
          <button onClick={() => this.props.store.animation.resetAnimation()} type='button'>
            Reset Animation
          </button>
        </div>
        <p> Time:
          {this.props.store.animation.time}
        </p>
        <InputCheckBox
          name='animation'
          label='Animation'
          checked={this.props.store.flags.flags.runtime.animation}
          cb={() => this.handleChange()}
        />
      </div>
    );
  }
}

const Debug = () => (
  <div className='sidepanel--content'>
    <h3>Debug</h3>
    <AlignToggler />
    <ControlButtons />
    <Animation />
  </div>
);

export default Debug;
