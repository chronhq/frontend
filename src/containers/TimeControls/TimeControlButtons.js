import React from 'react';
import { observer, inject } from 'mobx-react';

import Button, { BUTTON_TYPE } from '../../components/Button/Button';

@inject('store')
@observer
class TimeControlButton extends React.Component {
  render() {
    const { icon } = this.props;
    const mod = this.props.store.courseSelection.courseId ? 'Tick' : 'Year';
    const control = `${this.props.control}${mod}`;
    const metric = `${mod.toLocaleLowerCase()}_change`;
    return (
      <Button
        btnType={BUTTON_TYPE.ICON}
        onClick={() => {
          this.props.store.year[control]();
          this.props.store.analytics.metricHit(metric);
        }}
      >
        <div className={`time-controls__button-size icon icon__shadow--soft icon-${icon}`} />
      </Button>
    );
  }
}

const PrevYear = () => <TimeControlButton icon='rewind' control='prev' />;

const NextYear = () => <TimeControlButton icon='forward' control='next' />;

const MenuPlay = () => <TimeControlButton icon='play' control='play' />;

const MenuBack = () => <TimeControlButton icon='back' control='back' />;

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
