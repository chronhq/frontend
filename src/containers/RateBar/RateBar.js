import React, { Component } from 'react';

import './RateBar.less';

class RateBar extends Component {
  state = {
    rate: 42,
  }

  increment() {
    this.setState(state => ({ rate: state.rate + 1 }));
  }

  decriment() {
    this.setState(state => ({ rate: state.rate - 1 }));
  }

  render() {
    return (
      <div className='rate-widget'>
        <button type='button' onClick={() => this.decriment()}>
          <i className='lnr lnr-arrow-down' aria-hidden='true' />
        </button>
        <span>
          {this.state.rate}
        </span>
        <button type='button' onClick={() => this.increment()}>
          <i className='lnr lnr-arrow-up' aria-hidden='true' />
        </button>
      </div>
    );
  }
}

export default RateBar;
