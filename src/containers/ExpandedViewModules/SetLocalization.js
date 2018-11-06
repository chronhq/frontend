import React from 'react';
// import { inject, observer } from 'mobx-react';
// import { action } from 'mobx';
import ym from 'react-yandex-metrika';
import { InputRadio } from '../../components/Input';


class SetLocalization extends React.Component {
  get languages() {
    return Object.keys(this.props.i18n.languages).map(cur => ({
      key: cur,
      value: cur,
      checked: this.props.i18n.lng === cur,
      label: this.props.i18n.languages[cur],
      onChange: () => this.handleOptionChange(cur)
    }));
  }

  handleOptionChange = (lng) => {
    this.props.i18n.select(lng);
    ym('reachGoal', 'locale', lng);
  }

  render() {
    return (
      <div className='layerControl'>
        <h5>
          {this.props.i18n.data.settings.language}
        </h5>
        <form>
          {this.languages.map(lng => <InputRadio {...lng} />)}
        </form>
      </div>
    );
  }
}

export default SetLocalization;
