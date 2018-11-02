import React from 'react';

class SetLocalizationToggle extends React.Component {
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
      <button type='button' className='decorless' onClick={() => this.toggleLanguage()}>
        {
          (window.store.i18n.lng === 'en') ? 'Русский' : 'English'
        }
      </button>
    );
  }
}

export default SetLocalizationToggle;
