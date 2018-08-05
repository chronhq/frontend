import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './RotatingLogo.less';

import logoRu from '../../img/logo-grey-ru.svg';
import logoEng from '../../img/logo-grey-en.svg';

@inject('store')
@observer
class RotatingLogo extends Component {
  get logo() {
    switch (this.props.store.i18n.lng) {
      case 'ru':
        return logoRu;
      default:
        return logoEng;
    }
  }

  render() {
    return (
      <div className='white-overlay'>
        <div className='loading'>
          <img
            src={this.logo}
            alt='logo'
          />
          <h2>
            загружается...
          </h2>
        </div>
      </div>
    );
  }
}

export default RotatingLogo;
