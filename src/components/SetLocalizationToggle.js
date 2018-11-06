import React from 'react';

class SetLocalizationToggle extends React.Component {
  get next() {
    return (this.props.i18n.lng === 'en')
      ? {
        key: 'ru',
        text: this.props.i18n.languages.ru,
      }
      : {
        key: 'en',
        text: this.props.i18n.languages.en,
      };
  }

  toggleLanguage = () => {
    this.props.i18n.select(this.next.key);
  }

  render() {
    return (
      <button type='button' className='decorless' onClick={this.toggleLanguage}>
        {this.next.text}
      </button>
    );
  }
}

export default SetLocalizationToggle;
