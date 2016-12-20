import React from 'react';
import Fact from './Fact';

export default class Legend extends React.Component{
  render(){
    let currentYear = this.props.currentYear;
    let facts = this.props.facts.map(function(fact) {
      let factAlreadyOccured = currentYear > fact.year ? true : false;
      return <Fact fact={fact} completed={factAlreadyOccured} />;
    });
    return (<div className='legend'>{facts}</div>)
  }
}
