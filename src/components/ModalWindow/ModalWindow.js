import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import ModalPortalWrapper from '../ModalPortalWrapper';

import './ModalWindow.less';
import { SpinnerInline } from '../Spinner/Spinner';
import TwoActions from '../TwoActions/TwoActions';
import ActionButton from '../ActionButtons/ActionButtons';

@observer
class ModalWindow extends React.Component {
  render() {
    return (
      <ModalPortalWrapper
        isOpen={this.props.isOpen}
        close={this.props.close}
        className={`${this.props.blockBackground ? 'modal-window__background' : ''}`}
      >
        <div className='float-container modal-window__position'>
          {this.props.children}
        </div>
      </ModalPortalWrapper>
    );
  }
}

@observer
class WaitWindow extends React.Component {
  @observable timerMax = this.props.timerMax || 300;

  @observable timer = this.timerMax;

  tick = action(() => {
    this.timer -= 1;
    if (this.timer === 0) this.timer = 60;
    this.timeout = setTimeout(() => this.tick(), 1000);
  })

  resetTimer = action(() => {
    clearTimeout(this.timeout);
    this.timer = this.timerMax;
  })

  componentDidMount() {
    if (this.props.isOpen) this.tick();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.resetTimer();
      if (this.props.isOpen) this.tick();
    }
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  render() {
    return (
      <ModalWindow
        blockBackground
        isOpen={this.props.isOpen}
        close={() => null}
      >
        <h3>Please wait</h3>
        <p>Calculating overlaps</p>
        <p>It might take up to 300 seconds</p>
        <div className='modal-window__timer'>
          <SpinnerInline />
          <h3>
            {this.timer}
            s
          </h3>
        </div>
      </ModalWindow>
    );
  }
}

@observer
class ConfirmationWindow extends React.Component {
  render() {
    return (
      <ModalWindow
        blockBackground
        close={this.props.cancel}
        isOpen={this.props.isOpen}
      >
        <h3>{this.props.title || 'Please confirm'}</h3>
        <p>{this.props.text}</p>
        <TwoActions>
          <ActionButton text='Cancel' icon='cancel' click={this.props.cancel} />
          <ActionButton text='Confirm' icon='checkmark' click={this.props.confirm} />
        </TwoActions>
      </ModalWindow>
    );
  }
}

export { WaitWindow, ConfirmationWindow };

export default ModalWindow;
