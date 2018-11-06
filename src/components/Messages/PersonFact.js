import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';


@inject('store')
@observer
class PersonFact extends React.Component {
  render() {
    const { person } = { ...this.props };
    return (
      <div key={person.key}>
        <p className='ballon-title'>
          {person.title}
        </p>
        <p className='factHeader'>
          {person.occasion}
        </p>
        <p className='factDate'>
          {person.birthDate}
          <br />
          {person.deathDate}
        </p>
        <p className='factDescription'>
          {person.location}
        </p>
      </div>
    );
  }
}

export default PersonFact;
