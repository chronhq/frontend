import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class YearButton extends React.Component {
  toggle() {
    this.props.store.flags.runtime.toggle('yearInput');
  }

  render() {
    return (
      <button
        onClick={() => this.toggle()}
        type='button'
      >
        {this.props.store.year.tuneValue}
      </button>
    );
  }
}

export default YearButton;
