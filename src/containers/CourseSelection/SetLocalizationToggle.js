import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import { InputRadio } from '../../components/Input';

class SetLocalizationToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleLanguage() {
    if (window.store.i18n.lng === 'ru') {
      window.store.i18n.lng = 'en';
    } else {
      window.store.i18n.lng = 'ru';
    }
    this.forceUpdate();
  }

  render() {
    return (
      <button className='decorless' onClick={() => this.toggleLanguage()}>
        {
          (window.store.i18n.lng === 'en') ? 'Русский' : 'English'
        }
      </button>
    );
  }
}


// const SetLocalizationToggle = () => (
//   <button />
// );

export default SetLocalizationToggle;
