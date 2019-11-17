import React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import Button, { BUTTON_TYPE } from '../../components/Button/Button';

@inject('store')
@observer
class TimeControlButton extends React.Component {
  render() {
    const { icon } = this.props;
    const clickAction = () => {
      const mod = this.props.store.courseSelection.courseId ? 'Tick' : 'Year';
      const control = `${this.props.control}${mod}`;
      const metric = `${mod.toLocaleLowerCase()}_change`;
      this.props.store.year[control]();
      this.props.store.analytics.metricHit(metric);
    };
    return (
      <Button
        btnType={BUTTON_TYPE.ICON}
        onClick={this.props.action || clickAction}
      >
        <div className={`time-controls__button-size icon icon__shadow--soft icon-${icon}`} />
      </Button>
    );
  }
}

@inject('store')
@observer
class BackFromRegimeButton extends React.Component {
  @computed get overview() {
    return this.props.store.year.tick === -1;
  }

  @computed get metric() {
    return this.overview ? 'narrative_back' : 'narrative_open';
  }

  control = () => {
    const res = this.overview
      ? this.props.store.courseSelection.handleSelect('world', this.props.history)
      : this.props.store.year.setTick(-1);
    this.props.store.analytics.metricHit(this.metric);
    return res;
  }

  render() {
    return (
      <TimeControlButton
        icon={this.props.icon}
        control={this.props.control}
        action={this.control}
      />
    );
  }
}

const BackFromRegimeButtonWithRouter = withRouter(BackFromRegimeButton);

const PrevYear = () => <TimeControlButton icon='rewind' control='prev' />;

const NextYear = () => <TimeControlButton icon='forward' control='next' />;

const MenuPlay = () => <TimeControlButton icon='play' control='play' />;

const MenuBack = () => <BackFromRegimeButtonWithRouter icon='back' control='back' />;

const TimeControlButtons = ({ back = false }) => (
  <div className='time-controls__buttons'>
    {back && <MenuBack />}
    <PrevYear />
    <MenuPlay />
    <NextYear />
  </div>
);

export {
  PrevYear,
  NextYear,
  MenuBack,
  MenuPlay,
};

export default TimeControlButtons;
