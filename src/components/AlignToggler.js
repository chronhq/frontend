import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('store')
@observer
class AlignToggler extends React.Component {
  @observable value = 'right';

  @action handleChange(event) {
    this.value = event.target.value;
  }

  @action handleSubmit(event) {
    event.preventDefault();
    this.props.store.flags.flags.runtime.alignPanel = this.value;
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <select placeholder="select" onChange={e => this.handleChange(e)}>
            <option value='right'>
              { 'Right' }
            </option>
            <option value='left'>
              { 'Left' }
            </option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AlignToggler;
