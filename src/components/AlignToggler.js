import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

// import { FormControl, ControlLabel } from 'react-bootstrap';

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
      <div className='sidepanel--content'>
        <h3> Debug </h3>
        <form onSubmit={e => this.handleSubmit(e)}>
          <h5>UI Align</h5>
          <select placeholder="select" onChange={e => this.handleChange(e)}>
            <option value='right'>Правое</option>
            <option value='left'>Левое</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AlignToggler;
