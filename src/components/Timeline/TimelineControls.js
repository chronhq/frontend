import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
import './TimelineControls.less';
import TimelineButtons from './TimelineButtons';
import { Tooltip } from '../Input';

const ChangeTickButton = ({ direction, tip, cb }) => (
  <div className={`timeline__control control__${direction}`}>
    <Tooltip content={tip} placement='left'>
      <button onClick={() => cb()} type='button'>
        {direction === 'down' ? <hr /> : null}
        <span className={`lnr lnr-chevron-${direction}`} />
        {direction === 'up' ? <hr /> : null}
      </button>
    </Tooltip>
  </div>
);

@inject('store')
@observer
export default class TimelineControls extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
  }

  @computed get className() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified
      ? ['timeline', 'timeline__minified'].join(' ')
      : ['timeline'].join(' ');
  }

  handleWheel(event) {
    if (event.deltaY > 0) {
      this.props.store.year.nextTick();
    } else if (event.deltaY < 0) {
      this.props.store.year.prevTick();
    }
  }

  handlePress(event) {
    // console.log(e.keyCode);
    event.preventDefault();
    switch (event.keyCode) {
      case 38: // Up arrow
        this.props.store.year.prevTick();
        break;
      case 40: // Down arrow
        this.props.store.year.nextTick();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div
        className={this.className}
        id="keyboard"
        role="button"
        tabIndex='0'
        onWheel={e => this.handleWheel(e)}
        onKeyDown={e => this.handlePress(e)}
      >
        <TimelineButtons />
        <ChangeTickButton
          tip={this.tooltips.prevYear}
          direction='up'
          cb={() => this.props.store.year.prevTick()}
        />
        {this.props.children}
        <ChangeTickButton
          tip={this.tooltips.nextYear}
          direction='down'
          cb={() => this.props.store.year.nextTick()}
        />
      </div>
    );
  }
}
