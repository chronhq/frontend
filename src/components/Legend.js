import React from 'react';
import Fact from './Fact';

export default class Legend extends React.Component{
  render(){
    let facts = this.props.facts.map(function(fact) {
      return <Fact fact={fact} />;
    });
    return (<div className='legend'>{facts}</div>)
  }
}
