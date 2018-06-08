import React from 'react';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import { InputRadio } from '../../components/Input';


class SetLocalization extends React.Component {
  handleOptionChange(e) {
    window.store.i18n.lng = e.target.value;
    this.forceUpdate();
  }

  render() {
    return (
      <div className='layerControl'>
        <h5> Язык </h5>
        <form>
          <InputRadio value='en' label={'English'} checked={window.store.i18n.lng === 'en'} onChange={(e) => this.handleOptionChange(e)}/>
          <InputRadio value='ru' label={'Русский'} checked={window.store.i18n.lng === 'ru'} onChange={(e) => this.handleOptionChange(e)}/>
        </form>
      </div>
    );
  }
}


export default SetLocalization;
