import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';

@inject('store')
@observer
class YearInput extends React.Component {
  @computed get now() {
    return this.localNow || this.props.store.year.now;
  }

  @computed get errors() {
    return {
      now: this.now.length === 0 || this.now > 2000,
    };
  }

  handlePress(event) {
    switch (event.key) {
      case 'Enter':
        this.props.store.year.setYear(Number(this.now));
        this.localNow = null;
        break;
      default:
        break;
    }
  }

  handleChange(event) {
    console.log(`change: ${event.target.value}`);
    if (isNaN(event.target.value)) {
    } else {
      this.localNow = event.target.value;
    }
  }

  @observable localNow = null;

  render() {
    return (
      <input
        type="text"
        pattern="[0-9]*"
        length='4'
        value={this.now}
        onKeyDown={event => this.handlePress(event)}
        onChange={event => this.handleChange(event)}
        className={this.errors.now ? 'yearInput error' : 'yearInput'}
      />
    );
  }
}


export default YearInput;
