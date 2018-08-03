import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import logoRu from '../../img/logo-grey-ru.svg';
import logoEng from '../../img/logo-grey-en.svg';

@inject('store')
@observer
class TitleLogo extends React.Component {
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
      <Link to='/' className='errorPage__logo'>
        <img
          src={this.logo}
          alt='logo'
        />
      </Link>
    );
  }
}

export default TitleLogo;
