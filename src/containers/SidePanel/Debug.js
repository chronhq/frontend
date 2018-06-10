import React from 'react';
import { observer, inject } from 'mobx-react';
import ControlButtons from '../../components/TimePanel/ControlButtons';
import AlignToggler from '../../components/AlignToggler';

@inject('store')
@observer
class Animation extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.store.animation.startAnimation()}> Start Animation </button>
        <button onClick={() => this.props.store.animation.stopAnimation()}> Stop Animation </button>
        <button onClick={() => this.props.store.animation.resetAnimation()}> Reset Animation </button>
        <p> Time: {this.props.store.animation.time} </p>
      </div>
    );
  }
}

const Debug = () => (
  <div className='sidepanel--content'>
    <h3> Debug </h3>
    <AlignToggler />
    <ControlButtons />
    <Animation />
  </div>
);

export default Debug;
