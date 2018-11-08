import React, { Component } from 'react';

import './LoadingLogo.less';

class LoadingLogo extends Component {
  render() {
    return (
      <div className='white-overlay'>
        <div className='loading'>
          <img
            src={this.props.i18n.logo}
            alt='logo'
          />
          <h2>
            {this.props.i18n.data.loading}
          </h2>
        </div>
      </div>
    );
  }
}

export default LoadingLogo;
