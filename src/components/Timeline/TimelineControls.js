import React from 'react';
// import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { computed, action } from 'mobx';
// import 'MiniSidebar.less';
import './TimelineControls.less';
import TimelineButtons from './TimelineButtons';


const tooltip = text => (
  <Tooltip id="tooltip"><strong>{text}</strong></Tooltip>
);

const ChangeTickButton = ({ direction, tip, cb }) => (
  <div className={`timeline__control control__${direction}`}>
    <OverlayTrigger placement='left' delayShow={150} delayHide={5} overlay={tooltip(tip)} >
      <button onClick={() => cb()}>
        <i className={`fa fa-angle-${direction} fa-fw`} />
        <hr />
      </button>
    </OverlayTrigger>
  </div>
);

@inject('store')
@observer
export default class TimelineControls extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
  }

  @computed get className() {
    return this.props.store.flags.flags.runtime.timelineIsMinified
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
        <NavigationPan />
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

@inject('store')
@observer
class NavigationPan extends React.Component {
  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
  }

  @computed get tip() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified
      ? this.tooltips.expand
      : this.tooltips.collapse;
  }
  @computed get isMin() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified;
  }

  @action toggleTimepanel() {
    this.props.store.flags.flags.runtime.TimelineIsMinified = !this.isMin;
  }

  render() {
    return (
      <div className='timeline__control control__home'>
        <OverlayTrigger placement='bottom' delayShow={150} delayHide={5} overlay={tooltip(this.tip)} >
          <button onClick={() => this.toggleTimepanel()}>
            <i className='fa fa-bars fa-fw' />
          </button>
        </OverlayTrigger>
        {(!this.isMin) && <TimelineButtons />}
      </div>
    );
  }
}
