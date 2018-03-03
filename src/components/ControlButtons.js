import React from 'react';
import { observer, inject } from 'mobx-react';
// import PropTypes from 'prop-types';
import YearInput from './TimePanel-YearInput';

@inject('store')
@observer
class ControlButtons extends React.Component {
  render() {
    return (
      <div className='playButton col-sm-4 col-sm-pull-8'>
        <button onClick={() => this.props.store.year.resetYear()}>
          <i className='fa fa-undo' aria-hidden='true' title='Restart' />
        </button>
        <button onClick={() => this.props.store.year.prevYear()}>
          <i className='fa fa-step-backward' aria-hidden='true' title='Previous Year' />
        </button>
        <button onClick={() => this.props.store.year.togglePlay()} >
          {this.props.store.year.playing
            ? <i className='fa fa-pause' aria-hidden='true' title='Pause' />
            : <i className='fa fa-play' aria-hidden='true' title='Play' />
          }
        </button>
        <button onClick={() => this.props.store.year.nextYear()}>
          <i className='fa fa-step-forward' aria-hidden='true' title='Next Year' />
        </button>
        <YearInput />
      </div>
    );
  }
}

export default ControlButtons;
