import React from 'react';
import Fact from './Fact';

export default class Legend extends React.Component{
  render(){
    let facts = this.props.facts.map(function(fact) {
      return <Fact fact={fact} />;
    });
    return (<div width="20%" height="30%"><h1>Events</h1>{facts}</div>)
  }
}
