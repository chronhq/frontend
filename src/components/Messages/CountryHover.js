import React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

// language, properties, type

@inject('store')
@observer
class CountryHover extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get selectors() {
    return this.props.store.i18n.data.selectors;
  }

  @computed get properties() {
    return this.props.store.data.Properties.data[this.props.id];
  }

  @computed get name() {
    return this.properties[this.selectors.properties];
  }

  @computed get admin() {
    return this.props.store.data.Admins.data[this.properties.admin][this.lng];
  }

  @computed get type() {
    return this.props.store.data.Types.data[this.properties.type][this.lng];
  }

  @computed get short() {
    return (
      <p>
        {' ['}
        {this.type}
        {']'}
      </p>
    );
  }

  @computed get long() {
    if (this.type === null) {
      // for ainu course
      return (
        <p>
          {this.admin}
        </p>
      );
    }

    return (
      <p>
        {this.admin}
        {' ['}
        {this.type}
        {']'}
      </p>
    );
  }

  @computed get message() {
    if (this.name === this.admin && this.admin !== '') {
      return this.short;
    }
    return this.long;
  }


  render() {
    return (
      <div className='factInner'>
        <p className='factHeader'>
          {this.name}
        </p>
        {this.message}
      </div>
    );
  }
}

export default CountryHover;
