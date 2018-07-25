import React from 'react';

import { inject, observer } from 'mobx-react';

import ControlButtons from './ControlButtons';
import SeekBar from './SeekBar';
import './TimePanel.less';

@inject('store')
@observer
class TimePanel extends React.Component {
  render() {
    return (
      <div className='timepanel'>
        <SeekBar />
        <ControlButtons />
        {/*
          // #TODO button for expand mobile UI
          <button className='timepanel__feedbutton' onClick={() => console.log('stuff')}>
            <i className='lnr lnr-chevron-up' aria-hidden='true' title='Open Panel' />
          </button>
        */}
      </div>);
  }
}

export default TimePanel;
