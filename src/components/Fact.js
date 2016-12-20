import React from 'react';

export default class Fact extends React.Component {
  render(){
    let fact = this.props.fact;
    let date = fact.year;
    if ( fact.day !== undefined ){
      date = fact.year + '-' + fact.month + '-' +  fact.day;
    }
    
    return(
      <div>
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
