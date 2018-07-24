import React from 'react';
import { observer, inject } from 'mobx-react';
import ButtonBio from './ButtonBio';
import ButtonReturn from './ButtonReturn';
import ButtonMenu from './ButtonMenu';

@inject('store')
@observer
class TimelineButtons extends React.Component {
  render() {
    return (
      <div className='timeline__control control__home'>
        {this.props.store.flags.flags.runtime.TimelineIsMinified ? null : <ButtonReturn />}
        {this.props.store.flags.flags.runtime.TimelineIsMinified ? null : <ButtonBio />}
        <ButtonMenu />
      </div>
    );
  }
}

export default TimelineButtons;
