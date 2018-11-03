import React from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import TimelineEvents from '../../containers/TimelineEvents/TimelineEvents';
import ChangeTickButton from '../../components/ChangeTickButton/ChangeTickButton';
import TimelineButtons from '../../containers/TimelineButtons/TimelineButtons';
import './Timeline.less';

@inject('store')
@observer
class Timeline extends React.Component {
  componentDidMount() {
    if (this.props.store.flags.flags.runtime.animation) {
      this.props.store.animation.startAnimation();
    }
  }

  componentWillUnmount() {
    this.props.store.animation.stopAnimation();
  }

  @computed get className() {
    return this.props.store.flags.flags.runtime.TimelineIsMinified
      ? ['timeline', 'timeline__minified'].join(' ')
      : ['timeline'].join(' ');
  }


  @computed get tooltips() {
    return this.props.store.i18n.tooltips;
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
