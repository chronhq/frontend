import React, { Component } from 'react';

import './RateBar.less';

class RateBar extends Component {
  state = {
    rate: 0,
    canVote: false
  }

  componentDidMount() {
    this.checkCookie();
  }

  checkCookie() {
    if (document.cookie.indexOf('voted=') >= 0) {
      this.setState({ canVote: false });
    } else {
      this.setState({ canVote: true });
    }
  }

  putVoteCookie() {
    const expiry = new Date();
    expiry.setTime(Date.now() + (1000 * 24 * 60 * 60 * 1000));

    document.cookie = `voted=yes; expires=${expiry.toGMTString()}`;
    this.setState({ canVote: false });
  }

  increment() {
    this.setState(state => ({ rate: state.rate + 1 }));
    this.putVoteCookie();
  }

  decriment() {
    this.setState(state => ({ rate: state.rate - 1 }));
    this.putVoteCookie();
  }

  render() {
    return (
      <div className='rate-widget'>
        <button disabled={!this.state.canVote} type='button' onClick={() => this.decriment()}>
          <i className='lnr lnr-arrow-down' aria-hidden='true' />
        </button>
        <span>
          {this.state.rate}
        </span>
        <button disabled={!this.state.canVote} type='button' onClick={() => this.increment()}>
          <i className='lnr lnr-arrow-up' aria-hidden='true' />
        </button>
      </div>
    );
  }
}

export default RateBar;
