import React from 'react';

import ControlButtons from './ControlButtons';
import SeekBar from './SeekBar';
import './TimePanel.less';

class TimePanel extends React.Component {
  state = {
    width: this.width
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.resize(), false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resize(), false);
  }
  get width() {
    return window.innerWidth < 600
      ? window.innerWidth
      : window.innerWidth - 300;
  }
  resize() {
    if (window.innerWidth < 600) {
      this.setState({ width: window.innerWidth });
    } else {
      this.setState({ width: window.innerWidth - 300 });
    }
  }
  render() {
    return (
      <div className='timepanel'>
        <SeekBar width={this.state.width} />
        <ControlButtons />
        <button className='timepanel__feedbutton' onClick={() => console.log('stuff')}>
          <i className='lnr lnr-chevron-up' aria-hidden='true' title='Open Panel' />
        </button>
      </div>
    );
  }
}

export default TimePanel;
