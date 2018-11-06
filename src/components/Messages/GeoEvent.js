import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

@inject('store')
@observer
class GeoEvent extends React.Component {
  @computed get title() {
    switch (this.props.store.i18n.lng) {
      case 'ru':
        return 'Справка';
      default:
        return 'Event';
    }
  }

  render() {
    const { fact } = { ...this.props };
    return (
      <div className='factInner'>
        <p className='ballon-title'>
          {this.title}
        </p>
        <p className='factDescription'>
          {fact.description}
        </p>
        <p className='factDate'>
          {fact.date}
        </p>
      </div>
    );
  }
}

export default GeoEvent;
