import React from 'react';

export default class Fact extends React.Component {
  render(){
    let factState = this.props.completed ? 'factAlreadyOccured' : 'factStillInFuture';
    let fact = this.props.fact;
    let date = fact.day !== undefined ? fact.year + '-' + fact.month + '-' +  fact.day : fact.year;

    return(
      <div className={factState}>
        <span className='factHeader'>
          <b>{fact.name}</b>
          <span className='factDate'>{date}</span>
        </span>
        <br />
        <span>{fact.description}</span>
        <span className='factAuthor'> by <i>{fact.authors.join(', ')}</i></span>
        <hr />
      </div>
    )
  }
}
