import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LoadingLogo extends Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          zIndex: '199'
        }}
      >
        <img
          src={this.props.store.i18n.logo}
          alt='logo'
          style={{ width: '300px' }}
        />
        <h5>
          {this.props.store.i18n.data.loading}
        </h5>
      </div>
    );
  }
}

export default LoadingLogo;
