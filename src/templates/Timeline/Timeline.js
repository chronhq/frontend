import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed, observable, reaction } from 'mobx';

import TimelineEvents from '../../containers/TimelineEvents/TimelineEvents';
import ChangeTickButton from '../../components/TimelineChangeTickButton/ChangeTickButton';
import TimelineButtons from '../../containers/TimelineButtons/TimelineButtons';
import './Timeline.less';

@inject('store')
@observer
class Timeline extends React.Component {
  componentDidMount() {
    if (this.props.store.flags.runtime.get('animation')) {
      this.props.store.animation.startAnimation();
    }
    this.tickReaction = reaction(
      () => this.props.store.year.tick,
      () => {
        // Timeline hack: active event on center
        const selectedNode = document.getElementsByClassName('timeline__entry--selected');
        const containerNode = document.getElementsByClassName('event__container');
        if (selectedNode[0] !== undefined) {
          containerNode[0].scrollTop = selectedNode[0].offsetTop - 222; // HARDCODE
        }
      }
    );
  }

  componentWillUnmount() {
    this.props.store.animation.stopAnimation();
    this.tickReaction.dispose();
  }

  @computed get className() {
    return this.props.store.flags.runtime.get('TimelineIsMinified')
      ? ['timeline', 'timeline__minified'].join(' ')
      : ['timeline'].join(' ');
  }

  @computed get tooltips() {
    return this.props.store.i18n.data.tooltips;
  }

  @observable tickReaction;

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
        // onWheel={e => this.handleWheel(e)}
        // onKeyDown={e => this.handlePress(e)}
      >
        <TimelineButtons />
        <ChangeTickButton
          tip={this.tooltips.prevYear}
          direction='up'
          cb={() => this.props.store.year.prevTick()}
        />
        <TimelineEvents />
        <ChangeTickButton
          tip={this.tooltips.nextYear}
          direction='down'
          cb={() => this.props.store.year.nextTick()}
        />
      </div>
    );
  }
}

export default Timeline;
