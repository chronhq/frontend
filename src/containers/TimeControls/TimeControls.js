import React from 'react';
import { observer, inject } from 'mobx-react';
import YearSelectButton from './YearSelectButton';

import {
  Reset, Prev, Play, Pause, Next
} from './TimeControlsButtons';

import './TimeControls.less';

@inject('store')
@observer
class TimeControls extends React.Component {
  render() {
    return (
      <div className='timepanel__controls'>
        <button type='button' onClick={() => this.props.store.year.resetYear()}>
          <Reset />
        </button>
        <button type='button' onClick={() => this.props.store.year.prevYear()}>
          <Prev />
        </button>
        <button type='button' onClick={() => this.props.store.year.togglePlay()}>
          {this.props.store.year.playing
            ? <Pause />
            : <Play />
          }
        </button>
        <button type='button' onClick={() => this.props.store.year.nextYear()}>
          <Next />
        </button>
        <YearSelectButton />
      </div>
    );
  }
}

export default TimeControls;
