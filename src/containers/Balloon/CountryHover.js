import React from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class CountryHover extends React.Component {
  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get properties() {
    return this.props.store.data.Properties.data[this.props.id];
  }

  @computed get name() {
    switch (this.lng) {
      case 'ru': {
        return this.properties.nameru;
      }
      default: {
        return this.properties.name;
      }
    }
  }

  @computed get admin() {
    const admin = this.props.store.data.Admins.data[this.properties.admin];
    switch (this.lng) {
      case 'ru': {
        return admin.ru;
      }
      default: {
        return admin.en;
      }
    }
  }

  @computed get type() {
    const type = this.props.store.data.Types.data[this.properties.type];
    switch (this.lng) {
      case 'ru': {
        return type.ru;
      }
      default: {
        return type.en;
      }
    }
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
