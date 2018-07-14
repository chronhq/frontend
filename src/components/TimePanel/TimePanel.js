import React from 'react';

import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import ControlButtons from './ControlButtons';
import SeekBar from './SeekBar';
import './TimePanel.less';

@inject('store')
@observer
class TimePanel extends React.Component {
  @computed get width() {
    return this.props.store.view.width < 600
      ? this.props.store.view.width
      : this.props.store.view.width - 300;
  }

  render() {
    return (
      <div className='timepanel'>
        <SeekBar width={this.width} />
        <ControlButtons />
        <button className='timepanel__feedbutton' onClick={() => console.log('stuff')}>
          <i className='lnr lnr-chevron-up' aria-hidden='true' title='Open Panel' />
        </button>
      </div>);
  }
}

export default TimePanel;
