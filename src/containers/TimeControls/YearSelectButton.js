import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class YearButton extends React.Component {
  toggle() {
    const isYearInput = this.props.store.flags.flags.runtime.yearInput;
    this.props.store.flags.set({ runtime: { yearInput: !isYearInput } });
  }

  render() {
    return (
      <button
        onClick={() => this.toggle()}
        type='button'
      >
        {this.props.store.control.now}
      </button>
    );
  }
}

export default YearButton;
