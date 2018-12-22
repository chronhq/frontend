import * as React from 'react';

import LayerControlWrapper from '../../containers/LayerControlWrapper/LayerControlWrapper';
import ControlButtons from '../../containers/TimeControls/TimeControls';
import './NarrativeMobileBar.less';

class NarrativeMobileBar extends React.Component {
  state = {
    isHidden: false,
  }

  unHide() {
    this.setState(state => ({ isHidden: !state.isHidden }));
  }

  render() {
    return (
      <div className={this.state.isHidden ? 'narrative-mobile-bar' : 'narrative-mobile-bar narrative-mobile-bar__hidden'}>
        <div className='narrative-mobile-bar__timecontrol'>
          <button
            type='button'
            className='narrative-mobile-bar__chevron'
            onClick={() => this.unHide()}
          >
            <i
              className={`lnr lnr-chevron-${this.state.isHidden ? 'down' : 'up'}`}
              aria-hidden='true'
              title='Open Panel'
            />
          </button>
          <ControlButtons />
          <button
            type='button'
            className='narrative-mobile-bar__dumpbutton'
            onClick={() => this.unHide()}
          >
            <i
              className={`lnr lnr-chevron-${this.state.isHidden ? 'down' : 'up'}`}
              aria-hidden='true'
              title='Open Panel'
            />
          </button>
        </div>
        <div className='narrative-mobile-bar-hiddenpart'>
          <div className='narrative-mobile-bar__layers'>
            <LayerControlWrapper />
          </div>
          <div className='narrative-mobile-bar-othercompoenents' />
        </div>
      </div>
    );
  }
}

export default NarrativeMobileBar;
